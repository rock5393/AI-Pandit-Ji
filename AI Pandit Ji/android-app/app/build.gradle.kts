plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
}

android {
  namespace = "com.aipanditji.app"
  compileSdk = 34

  defaultConfig {
    applicationId = "com.aipanditji.app"
    minSdk = 29
    targetSdk = 34
    versionCode = 1
    versionName = "1.0.0"
  }

  buildTypes {
    release {
      isMinifyEnabled = false
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
