import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(SafeAreaPlugin)
public class SafeAreaPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SafeAreaPlugin"
    public let jsName = "SafeArea"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getStatusBarHeight", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSafeAreaInsets", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = SafeArea()

    @objc func getStatusBarHeight(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            call.resolve([
                "height": self.implementation.getStatusBarHeight()
            ])
        }
    }

    @objc func getSafeAreaInsets(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            call.resolve(self.implementation.getSafeAreaInsets())
        }
    }
}
