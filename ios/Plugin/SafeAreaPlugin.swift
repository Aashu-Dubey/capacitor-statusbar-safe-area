import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(SafeAreaPlugin)
public class SafeAreaPlugin: CAPPlugin {
    private let implementation = SafeArea()

    @objc func getStatusBarHeight(_ call: CAPPluginCall) {
        var statusBarHeight: CGFloat = 0
        if #available(iOS 13.0, *) {
            let scenes = UIApplication.shared.connectedScenes
            let windowScene = scenes.first as? UIWindowScene
            let window = windowScene?.windows.first
            statusBarHeight = window?.windowScene?.statusBarManager?.statusBarFrame.height ?? 0
        } else {
            statusBarHeight = UIApplication.shared.statusBarFrame.height
        }
        
        call.resolve([
            "height": statusBarHeight
        ])
    }
    
    @objc func getSafeAreaInsets(_ call: CAPPluginCall) {
        let window: UIWindow?
        if #available(iOS 13.0, *) {
            window = UIApplication.shared.windows.first
        } else {
            window = UIApplication.shared.keyWindow
        }
        
        call.resolve([
            "top": window?.safeAreaInsets.top ?? 0,
            "bottom": window?.safeAreaInsets.bottom ?? 0,
            "left": window?.safeAreaInsets.left ?? 0,
            "right": window?.safeAreaInsets.right ?? 0,
        ])
    }
}
