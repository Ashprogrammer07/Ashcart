import { Helmet } from "react-helmet-async"
export default function MetaData({title}){
    return (
        <Helmet>
            <title>{`${title}-ASHCART`}</title>
        </Helmet>
    )
}