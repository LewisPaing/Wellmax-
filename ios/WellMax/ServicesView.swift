import SwiftUI

struct ServicesView: View {
    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 16) {
                SectionHeading(eyebrow: "Capabilities", title: "What WellMax can do")
                    .padding(.bottom, 8)

                ForEach(AppContent.services) { service in
                    HStack(alignment: .top, spacing: 16) {
                        Image(systemName: service.symbol)
                            .font(.title2)
                            .foregroundStyle(.wellMaxPurple)
                            .frame(width: 46, height: 46)
                            .background(.wellMaxPurple.opacity(0.1), in: RoundedRectangle(cornerRadius: 14))
                        VStack(alignment: .leading, spacing: 6) {
                            Text(service.title).font(.title3.bold())
                            Text(service.summary).foregroundStyle(.secondary)
                        }
                    }
                    .wellMaxCard()
                }
            }
            .padding(20)
        }
        .background(Color.wellMaxPaper)
        .navigationTitle("Services")
    }
}

