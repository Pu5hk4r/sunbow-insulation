import GlobalStyles from "./GlobalStyles";
import Navbar from "./Navbar";
import Hero from "./Hero";
import CategoryList from "./CategoryList";
import ProductsGrid from "./ProductsGrid";
import Certifications from "./Certifications";
import StatsSection from "./StatsSection";
import Contact from "./Contact";
import FloatingContact from "./FloatingContact";
import FestivalPopup from "./FestivalPopup";
import AIChatbot from "./AIChatbot";
import DataAnalyst from "./DataAnalyst";

export default function SunbowApp() {
    return (
        <main style={{ minHeight: "100vh", position: "relative" }}>
            <DataAnalyst />
            <GlobalStyles />
            <Navbar />
            <Hero />
            <CategoryList />
            <Certifications />
            <StatsSection />
            <Contact />
            <FloatingContact />
            <FestivalPopup />
            <AIChatbot />
        </main>
    );
}
