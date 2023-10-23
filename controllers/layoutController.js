import Layout from "../models/layout.js";
import LayoutPicture from "../models/layoutPicture.js";

export const getLayoutsPage = (req, res) => {
    return res.status(200).render('home/layout');
}

export const getLayouts = async (req, res) => {
    const layouts = await Layout.findAndCountAll({ include: { model: LayoutPicture } });    
    return res.status(200).json({ layouts })
}

export const getDemoLayout = async (req, res) => {
    const { id } = req.params;
    const demo = await Layout.findByPk(id);
        
    return res.render('home/demoLayout', { demo });
}