import Layout from "../models/layout.js";

export const getLayoutsPage = (req, res) => {
    return res.status(200).render('home/layout');
}

export const getLayouts = async (req, res) => {
    const response = await Layout.findAndCountAll();    
    return res.status(200).json({ response })
}

export const getDemoLayout = async (req, res) => {
    const { id } = req.params;
    const layout = await Layout.findByPk(id);
    
    return res.status(200).json({ layout })
}