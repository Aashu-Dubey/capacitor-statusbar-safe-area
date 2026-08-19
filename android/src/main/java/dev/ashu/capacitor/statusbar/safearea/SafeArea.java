package dev.ashu.capacitor.statusbar.safearea;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.res.Resources;
import android.os.Build;
import android.view.DisplayCutout;
import android.view.WindowInsets;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.JSObject;

public class SafeArea {

    public JSObject getStatusBarHeight(Activity activity) {
        Resources res = activity.getApplicationContext().getResources();
        float density = res.getDisplayMetrics().density;
        int statusBarHeightPx = 0;

        WindowInsetsCompat insets = ViewCompat.getRootWindowInsets(activity.getWindow().getDecorView());
        if (insets != null) {
            statusBarHeightPx = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top;
        }

        if (statusBarHeightPx == 0) {
            @SuppressLint({ "InternalInsetResource", "DiscouragedApi" })
            int resourceId = res.getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0) {
                statusBarHeightPx = res.getDimensionPixelSize(resourceId);
            }
        }

        JSObject ret = new JSObject();
        ret.put("height", statusBarHeightPx / density);
        return ret;
    }

    public JSObject getSafeAreaInsets(Activity activity) {
        float leftInset = 0,
            rightInset = 0,
            topInset = 0,
            bottomInset = 0;
        Resources res = activity.getApplicationContext().getResources();
        WindowInsetsCompat windowInsets = ViewCompat.getRootWindowInsets(activity.getWindow().getDecorView());

        if (windowInsets != null) {
            float density = res.getDisplayMetrics().density;
            Insets insets = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            leftInset = insets.left / density;
            rightInset = insets.right / density;
            topInset = insets.top / density;
            bottomInset = insets.bottom / density;
        }

        JSObject ret = new JSObject();
        ret.put("top", topInset);
        ret.put("bottom", bottomInset);
        ret.put("left", leftInset);
        ret.put("right", rightInset);
        return ret;
    }
}
