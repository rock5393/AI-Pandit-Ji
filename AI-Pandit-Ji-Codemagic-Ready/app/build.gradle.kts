plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
}

val cmKeystorePath = System.getenv("CM_KEYSTORE_PATH")
val cmKeystorePassword = System.getenv("CM_KEYSTORE_PASSWORD")
val cmKeyAlias = System.getenv("CM_KEY_ALIAS")
val cmKeyPassword = System.getenv("CM_KEY_PASSWORD")
val hasReleaseSigning = !cmKeystorePath.isNullOrBlank() &&
  !cmKeystorePassword.isNullOrBlank() &&
  !cmKeyAlias.isNullOrBlank() &&
  !cmKeyPassword.isNullOrBlank()

android {
  namespace = "com.aipanditji.app"
  compileSdk = 34

  defaultConfig {
    applicationId = "com.aipanditji.app"
    minSdk = 29
    targetSdk = 34
    versionCode = (System.getenv("CM_BUILD_ID")?.toIntOrNull() ?: 1)
    versionName = System.getenv("APP_VERSION_NAME") ?: "1.0.0"
  }

  signingConfigs {
    if (hasReleaseSigning) {
      create("release") {
        storeFile = file(cmKeystorePath!!)
        storePassword = cmKeystorePassword
        keyAlias = cmKeyAlias
        keyPassword = cmKeyPassword
      }
    }
  }

  buildTypes {
    debug {
      applicationIdSuffix = ".debug"
      versionNameSuffix = "-debug"
    }
    release {
      isMinifyEnabled = false
      if (hasReleaseSigning) {
        signingConfig = signingConfigs.getByName("release")
      }
      proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro"
      )
    }
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }

  kotlinOptions {
    jvmTarget = "17"
  }

  buildFeatures {
    viewBinding = true
  }
}

dependencies {
  implementation("androidx.core:core-ktx:1.13.1")
  implementation("androidx.core:core-splashscreen:1.0.1")
  implementation("androidx.appcompat:appcompat:1.7.0")
  implementation("androidx.activity:activity-ktx:1.9.0")
  implementation("androidx.webkit:webkit:1.11.0")
  implementation("com.google.android.material:material:1.12.0")
}
