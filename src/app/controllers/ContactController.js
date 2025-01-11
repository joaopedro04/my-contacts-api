const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
    async index(request, response) {
        const { orderBy } = request.query;
        const contacts = await ContactsRepository.findAll(orderBy);
        return response.json(contacts);
    }

    async show(request, response) {
        const { id } = request.params;
        const contact = await ContactsRepository.findById(id);

        if (!contact) {
            return response.status(404).json({
                error: 'contact not found'
            });
        }

        return response.json(contact);
    }

    async store(request, response) {
        const { name, email, phone, category_id } = request.body;

        const contactExists = await ContactsRepository.findByEmail(email);

        if (contactExists) {
            return response.status(400).json({
                error: 'This email already in use'
            });
        }

        const contact = await ContactsRepository.create({
            name,
            email,
            phone,
            category_id
        });

        response.send(contact);
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, email, phone, category_id } = request.body;


        const contactExists = await ContactsRepository.findById(id);

        if (!contactExists) {
            return response.status(404).json({
                error: 'user not found'
            });
        }

        if (!name) {
            return response.status(400).json({
                error: 'Name is required'
            });
        }

        const contactExistsByEmail = await ContactsRepository.findByEmail(email);

        if (contactExistsByEmail && contactExistsByEmail.id !== id) {
            return response.status(400).json({
                error: 'This email already in use'
            });
        }

        const contact = await ContactsRepository.update(id, {
            name,
            email,
            phone,
            category_id
        });

        response.json(contact);
    }

    async delete(request, response) {
        const { id } = request.params;

        await ContactsRepository.delete(id);

        return response.sendStatus(204);
    }
}

module.exports = new ContactController();
