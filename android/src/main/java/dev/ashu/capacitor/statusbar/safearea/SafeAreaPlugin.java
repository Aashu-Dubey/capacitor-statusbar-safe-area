package dev.ashu.capacitor.statusbar.safearea;

import android.content.res.Resources;
import android.graphics.Insets;
import android.os.Build;
import android.view.DisplayCutout;
import android.view.WindowInsets;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SafeArea")
public class SafeAreaPlugin extends Plugin {

    private SafeArea implementation = new SafeArea();

    @PluginMethod
    public void getStatusBarHeight(PluginCall call) {
        Resources res = getActivity().getApplicationContext().getResources();
        int statusBarHeight;
        int resourceId = res.getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            statusBarHeight = res.getDimensionPixelSize(resourceId);
            JSObject ret = new JSObject();
            ret.put("height", statusBarHeight / res.getDisplayMetrics().density);
            call.resolve(ret);
        } else {
            call.reject("Status bar height not obtained");
        }
    }

    @PluginMethod
    public void getSafeAreaInsets(PluginCall call) {
        float leftInset = 0, rightInset = 0, topInset = 0, bottomInset = 0;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            Resources res = getActivity().getApplicationContext().getResources();
            WindowInsets windowInsets = getActivity().getWindow().getDecorView().getRootWindowInsets();

            if (windowInsets != null) {
                float density = res.getDisplayMetrics().density;

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                    Insets insets = windowInsets.getInsets(
                        WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout() | WindowInsets.Type.navigationBars()
                    );
                    leftInset = insets.left / density;
                    rightInset = insets.right / density;
                    topInset = insets.top / density;
                    bottomInset = insets.bottom / density;
                } else if (Build.VERSION.SDK_INT == Build.VERSION_CODES.Q) {
                    final DisplayCutout cutout = windowInsets.getDisplayCutout();

                    leftInset = cutout != null ? cutout.getSafeInsetLeft() : 0;
                    rightInset = cutout != null ? cutout.getSafeInsetRight() : 0;
                    topInset = cutout != null ? cutout.getSafeInsetTop() : 0;
                    bottomInset = cutout != null ? cutout.getSafeInsetBottom() : 0;

                    Insets insets = windowInsets.getSystemWindowInsets();
                    leftInset = Math.max(leftInset, insets.left) / density;
                    rightInset = Math.max(rightInset, insets.right) / density;
                    topInset = Math.max(topInset, insets.top) / density;
                    bottomInset = Math.max(bottomInset, insets.bottom) / density;
                } else {
                    leftInset = windowInsets.getSystemWindowInsetLeft() / density;
                    rightInset = windowInsets.getSystemWindowInsetRight() / density;
                    topInset = windowInsets.getSystemWindowInsetTop() / density;
                    bottomInset = windowInsets.getSystemWindowInsetBottom() / density;
                }
            }
        }

        JSObject ret = new JSObject();
        ret.put("top", topInset);
        ret.put("bottom", bottomInset);
        ret.put("left", leftInset);
        ret.put("right", rightInset);
        call.resolve(ret);
    }
}
