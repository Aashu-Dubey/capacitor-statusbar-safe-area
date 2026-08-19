import Foundation
import Capacitor

@objc public class SafeArea: NSObject {
    @objc public func getStatusBarHeight() -> CGFloat {
        var statusBarHeight: CGFloat = 0
        if #available(iOS 13.0, *) {
            let window = getActiveWindow()
            statusBarHeight = window?.windowScene?.statusBarManager?.statusBarFrame.height ?? 0
        } else {
            statusBarHeight = UIApplication.shared.statusBarFrame.height
        }

        return statusBarHeight
    }

    @objc public func getSafeAreaInsets() -> [String: Any] {
        let window: UIWindow? = getActiveWindow()

        return [
            "top": window?.safeAreaInsets.top ?? 0,
            "bottom": window?.safeAreaInsets.bottom ?? 0,
            "left": window?.safeAreaInsets.left ?? 0,
            "right": window?.safeAreaInsets.right ?? 0
        ]
    }
    
    private func getActiveWindow() -> UIWindow? {
        if #available(iOS 13.0, *) {
            let scenes = UIApplication.shared.connectedScenes
            let windowScene = scenes.first as? UIWindowScene
            return windowScene?.windows.first
        } else {
            return UIApplication.shared.keyWindow
        }
    }
}
