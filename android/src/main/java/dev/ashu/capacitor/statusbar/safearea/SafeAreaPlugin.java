package dev.ashu.capacitor.statusbar.safearea;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SafeArea")
public class SafeAreaPlugin extends Plugin {

    private final SafeArea implementation = new SafeArea();

    @PluginMethod
    public void getStatusBarHeight(PluginCall call) {
        JSObject ret = implementation.getStatusBarHeight(getActivity());
        if (ret != null) {
            call.resolve(ret);
        } else {
            call.reject("Status bar height not obtained");
        }
    }

    @PluginMethod
    public void getSafeAreaInsets(PluginCall call) {
        call.resolve(implementation.getSafeAreaInsets(getActivity()));
    }
}
