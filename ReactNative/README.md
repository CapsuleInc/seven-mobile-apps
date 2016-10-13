# Tips and Tricks

 + Make sure you have set your ANDROID_HOME system variable to the location of the Android SDK and added it to your PATH 
 + Make sure you have set your JAVA_HOME system variable to the location of the Java JDK and added it to your PATH 
 
 + Remember to:
    1. cd to ./Notes 
    2. Have a running android virtual machine open before you run "react-native run-android"
 
 + If you get the error: "Could not get BatchedBridge, make sure your bundle is packaged correctly" , while running your virtual machine:
    + run "react-native start" to start the Javascript server and then reload the app with the same "react-native run-android" command
    
 + Connecting to a physical device
    + make sure you have allowed USB Debugging on your device
    + if you are not prompted to allow the connection to your device, open Android Studio and run a default hello world app to force the prompt
    + If you get the "BatchedBridge" error again on your physical device:
      + shake the device to bring up the developer menu
      + select "Dev Settings"
      + select "Debug Server host & port for device"
      + enter [your machines IP]:[port of your JS server] e.g. 192.168.1.2:8081
      + Reload the app
 
 + As of now, the map view component is still not supported on Android
  
Please note: 
** I was unable to test any of the iOS sections
