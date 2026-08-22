import SwiftUI

struct RootView: View {
    var body: some View {
        TabView {
            NavigationStack { HomeView() }
                .tabItem { Label("Home", systemImage: "house.fill") }

            NavigationStack { ServicesView() }
                .tabItem { Label("Services", systemImage: "sparkles") }

            NavigationStack { WorkView() }
                .tabItem { Label("Work", systemImage: "square.grid.2x2.fill") }

            NavigationStack { ProjectInquiryView() }
                .tabItem { Label("Start", systemImage: "paperplane.fill") }

            NavigationStack { ClientPortalView() }
                .tabItem { Label("Portal", systemImage: "person.crop.circle.fill") }
        }
    }
}

