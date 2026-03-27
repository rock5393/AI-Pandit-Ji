package com.aipanditji.app

import android.content.ContentValues
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat

class MainActivity : ComponentActivity() {
  private var fileChooserCallback: ValueCallback<Array<Uri>>? = null

  private val fileChooserLauncher =
    registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
      val callback = fileChooserCallback
      fileChooserCallback = null
      callback?.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data))
    }

  override fun onCreate(savedInstanceState: Bundle?) {
    installSplashScreen()
    super.onCreate(savedInstanceState)

    val assetLoader =
      WebViewAssetLoader.Builder()
        .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
        .build()

    val webView =
      WebView(this).apply {
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.allowFileAccess = false
        settings.allowContentAccess = true
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.mediaPlaybackRequiresUserGesture = false
        addJavascriptInterface(AndroidBridge(this@MainActivity), "AIPanditAndroid")
        webViewClient =
          object : WebViewClientCompat() {
            override fun shouldInterceptRequest(view: WebView, request: android.webkit.WebResourceRequest) =
              assetLoader.shouldInterceptRequest(request.url)
          }
        webChromeClient =
          object : WebChromeClient() {
            override fun onShowFileChooser(
              webView: WebView,
              filePathCallback: ValueCallback<Array<Uri>>,
              fileChooserParams: FileChooserParams
            ): Boolean {
              fileChooserCallback?.onReceiveValue(null)
              fileChooserCallback = filePathCallback
              return try {
                fileChooserLauncher.launch(fileChooserParams.createIntent())
                true
              } catch (_: Exception) {
                fileChooserCallback = null
                false
              }
            }
          }
      }

    setContentView(webView)
    webView.loadUrl("https://appassets.androidplatform.net/assets/web/index.html")
  }

  private class AndroidBridge(private val activity: MainActivity) {
    @JavascriptInterface
    fun savePdf(base64Pdf: String, fileName: String) {
      saveBase64File(base64Pdf, fileName, "application/pdf")
    }

    @JavascriptInterface
    fun saveImage(base64Image: String, fileName: String) {
      saveBase64File(base64Image, fileName, "image/png")
    }

    @JavascriptInterface
    fun saveFile(base64Data: String, fileName: String, mimeType: String) {
      saveBase64File(base64Data, fileName, mimeType)
    }

    private fun saveBase64File(base64Data: String, fileName: String, mimeType: String) {
      activity.runOnUiThread {
        try {
          val bytes = android.util.Base64.decode(base64Data, android.util.Base64.DEFAULT)
          val resolver = activity.contentResolver
          val values =
            ContentValues().apply {
              put(MediaStore.Downloads.DISPLAY_NAME, fileName)
              put(MediaStore.Downloads.MIME_TYPE, mimeType)
              put(MediaStore.Downloads.RELATIVE_PATH, "${Environment.DIRECTORY_DOWNLOADS}/AI Pandit Ji")
            }
          val uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
          if (uri == null) {
            Toast.makeText(activity, "Could not save file.", Toast.LENGTH_LONG).show()
            return@runOnUiThread
          }
          resolver.openOutputStream(uri)?.use { stream -> stream.write(bytes) }
          Toast.makeText(activity, "File saved to Downloads/AI Pandit Ji", Toast.LENGTH_LONG).show()
        } catch (_: Exception) {
          Toast.makeText(activity, "Could not save file.", Toast.LENGTH_LONG).show()
        }
      }
    }
  }
}
