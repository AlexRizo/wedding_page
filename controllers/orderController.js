export const orderHome = (req, res) => {
    return res.render('home/order')
}

export const createOrder = (req, res) => {
    return res.status(200).json('creada');
}