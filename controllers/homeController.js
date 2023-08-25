export const homePage = async(req, res) => {

    res.render('home/home');
}

export const taskPage = (req, res) => {
    res.render('home/tasks');
}

export const profilePage = (req, res) => {
    res.render('home/profile');
}