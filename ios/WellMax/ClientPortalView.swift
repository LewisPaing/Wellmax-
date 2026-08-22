import SwiftUI
import WebKit

struct ClientPortalView: View {
    var body: some View {
        PortalWebView(url: URL(string: "https://wellmaxagency.com/portal/")!)
            .ignoresSafeArea(edges: .bottom)
            .navigationTitle("Client Portal")
            .navigationBarTitleDisplayMode(.inline)
    }
}

private struct PortalWebView: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        let view = WKWebView(frame: .zero, configuration: configuration)
        view.allowsBackForwardNavigationGestures = true
        view.scrollView.keyboardDismissMode = .interactive
        view.load(URLRequest(url: url))
        return view
    }

    func updateUIView(_ uiView: WKWebView, context: Context) { }
}

