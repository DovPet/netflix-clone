import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import db from '../../firebase'
import './PlansScreen.css'
import { loadStripe } from '@stripe/stripe-js'

function PlansScreen() {

    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [sub, setSub] = useState(null)

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(qsnap => {
            qsnap.forEach(async sub => {
                setSub(
                    {
                        role: sub.data().role,
                        current_period_end: sub.data().current_period_end.seconds,
                        current_period_start: sub.data().current_period_start.seconds,
                    })
            })
        })
    },[user.uid])

    useEffect(() => {
        db.collection('products')
            .where('active', '==', true)
            .get().then(snap => {
                const products = {}
                snap.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data()
                    const priceSnap = await productDoc.ref.collection('prices').get()
                    priceSnap.docs.forEach(doc => {
                        products[productDoc.id].prices = {
                            priceId: doc.id,
                            priceData: doc.data()
                        }
                    })
                })
                setProducts(products)
            })
    }, [])

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
        .doc(user.uid)
        .collection('checkout_sessions')
        .add(
            {
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            })
        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data()
            if(error){
                alert(`An error occured: ' ${error.message}`)
            }
            if(sessionId){
                const stripe = await loadStripe('pk_test_51KEbP2B5d1uDVfeCdeNZ8RkNXWl0TfZrZVH8aVuWDvmdazvbUTm8TNFJ0T0bEkyZ2Pj3O658Y7ErhMwylhRXdj0T00tcE9zSVH')
                stripe.redirectToCheckout({sessionId})
            }
        })
    }

    return (
        <div className='plansScreen'>
        {sub && <p>Renewal date: {new Date(sub?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name?.toLowerCase().includes(sub?.role)
                return (
                    <div
                    key={productId}
                     className={`${isCurrentPackage && 'planScreen__plan--disabled'} plansScreen__plan`}>
                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData?.prices.priceId)}>
                            {isCurrentPackage ? 'Active Package' : 'Subscribe'}
                        </button>
                    </div>

                )
            })}
        </div>
    )
}

export default PlansScreen
