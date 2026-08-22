import SwiftUI

struct WorkView: View {
    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 24) {
                SectionHeading(eyebrow: "Selected work", title: "Ideas made visible")

                ForEach(AppContent.projects) { project in
                    VStack(alignment: .leading, spacing: 0) {
                        RemoteProjectImage(url: project.imageURL)
                        VStack(alignment: .leading, spacing: 7) {
                            Text(project.category.uppercased())
                                .font(.caption2.weight(.bold))
                                .tracking(1.2)
                                .foregroundStyle(.wellMaxPurple)
                            Text(project.title).font(.title2.bold())
                            Text(project.summary).foregroundStyle(.secondary)
                        }
                        .padding(18)
                    }
                    .background(Color(.secondarySystemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 24))
                }
            }
            .padding(20)
        }
        .background(Color.wellMaxPaper)
        .navigationTitle("Work")
    }
}

