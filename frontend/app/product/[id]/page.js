import ProductPage from "../../../components/ProductPage";

export default async function ProductRoute({ params }) {
    const resolvedParams = await params;
    return <ProductPage productId={resolvedParams.id} />;
}
