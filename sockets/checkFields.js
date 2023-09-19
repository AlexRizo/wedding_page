const $fields = {
    boyfriend_name: { name: 'boyfriend'},
    girlfriend_name: 50,
    boyfriend_email: 50,
    girlfriend_email: 50,
    wedding_date: 10,
    godfather: 50,
    boyfriend_father: 50,
    boyfriend_mother: 50,
    girlfriend_father: 50,
    girlfriend_mother: 50,
    church: 50,
    church_time: 10,
    church_location: 100,
    church_references: 200,
    event: 50,
    event_time: 10,
    event_location: 100,
    event_references: 200,
    gif_link: 100,
    bank: 20,
    history: 2000,
    men_clothes: 100,
    women_clothes: 100,
    considerations: 200,
}

const validateLenth = (fields = {}) => {
    fields.array.forEach(field => {
        if ($fields[field.name]) {
            
        }
    });
}