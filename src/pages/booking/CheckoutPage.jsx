import { Navigate,useLocation } from 'react-router-dom';export default function CheckoutPage(){const {search}=useLocation();return <Navigate replace to={`/booking${search}`}/>}
