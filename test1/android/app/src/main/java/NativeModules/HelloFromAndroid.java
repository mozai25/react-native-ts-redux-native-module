package NativeModules;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class HelloFromAndroid extends ReactContextBaseJavaModule {

    final static String helloEventName = "SendHelloEvent";
    public static ReactApplicationContext app_context;

    public HelloFromAndroid(ReactApplicationContext reactContext) {
        app_context = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "HelloFromAndroid";
    }

    @ReactMethod
    public void HelloMethod () {

        WritableArray array = Arguments.createArray();
        WritableMap helloDictionary = Arguments.createMap();
        helloDictionary.putString("action", "Hello from Android Native Module!");
        array.pushMap(helloDictionary);

        sendEvent(helloEventName, array);
    }

    @ReactMethod
    public void addListener(String eventName) {

    }

    @ReactMethod
    public void removeListeners(Integer count) {

    }

    private void sendEvent(String eventName,
                           @Nullable WritableArray params) {

        if (app_context.hasActiveReactInstance()) {
            app_context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }
}
