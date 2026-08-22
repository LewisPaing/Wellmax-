import SwiftUI

struct ProjectInquiryView: View {
    @Environment(\.openURL) private var openURL
    @State private var name = ""
    @State private var company = ""
    @State private var email = ""
    @State private var service = AppContent.services[0].title
    @State private var message = ""
    @State private var showValidation = false

    var body: some View {
        Form {
            Section {
                Text("Tell us what you’re building. This will prepare an email to the WellMax team.")
                    .foregroundStyle(.secondary)
            }

            Section("Your details") {
                TextField("Name", text: $name)
                    .textContentType(.name)
                TextField("Company", text: $company)
                    .textContentType(.organizationName)
                TextField("Email", text: $email)
                    .textContentType(.emailAddress)
                    .textInputAutocapitalization(.never)
                    .keyboardType(.emailAddress)
            }

            Section("Project") {
                Picker("Service", selection: $service) {
                    ForEach(AppContent.services) { item in
                        Text(item.title).tag(item.title)
                    }
                }
                TextField("Project goals, timing and budget", text: $message, axis: .vertical)
                    .lineLimit(5...10)
            }

            Section {
                Button {
                    submit()
                } label: {
                    Label("Email WellMax", systemImage: "paperplane.fill")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
            }
        }
        .navigationTitle("Start a Project")
        .alert("Please add your name, email and project details.", isPresented: $showValidation) {
            Button("OK", role: .cancel) { }
        }
    }

    private func submit() {
        guard !name.trimmingCharacters(in: .whitespaces).isEmpty,
              email.contains("@"),
              !message.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            showValidation = true
            return
        }

        let subject = "WellMax project enquiry — \(company.isEmpty ? name : company)"
        let body = """
        Name: \(name)
        Company: \(company)
        Email: \(email)
        Service: \(service)

        Project details:
        \(message)
        """
        var components = URLComponents()
        components.scheme = "mailto"
        components.path = "wellmaxadvertisingmedia@gmail.com"
        components.queryItems = [
            URLQueryItem(name: "subject", value: subject),
            URLQueryItem(name: "body", value: body)
        ]
        if let url = components.url { openURL(url) }
    }
}

