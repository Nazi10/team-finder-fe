import Feature from "@/components/layout/Feature";
import Footer from "@/components/layout/Footer";
import MenuHeader from "@/components/layout/Header";
import Register from "@/components/layout/Register";

export default function Home() {
  return (
    <div>
      <MenuHeader />
      <div className="bg-gray-100 font-sans">
        <section className="text-center">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 leading-tight mb-4 py-2">
              Find Your Perfect Team
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Connect with people who complement your skills and preferences.
            </p>
            <Register />
          </div>
        </section>
        <section className="bg-gray-200 py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-3">
              <Feature
                title="Create Profile"
                description="Sign up and create your profile, including your skills and preferences."
              />
              <Feature
                title="Find Teams"
                description="Browse through available teams and find the perfect match for you."
              />
              <Feature
                title="Connect & Collaborate"
                description="Connect with team members and start collaborating on exciting projects."
              />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
