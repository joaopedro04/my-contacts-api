const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
    async index(request, response) {
        const { orderBy } = request.query;
        const categories = await CategoriesRepository.findAll(orderBy);
        return response.json(categories);
    }

    async show(request, response) {
        const { id } = request.params;
        const category = await CategoriesRepository.findById(id);

        if (!category) {
            return response.status(404).json({
                error: 'category not found'
            });
        }

        return response.json(category);
    }

    async store(request, response) {
        const { name } = request.body;

        if (!name) {
            return response.status(400).json({
                error: 'field name is required'
            });
        }

        const category = await CategoriesRepository.create({
            name
        });

        response.send(category);
    }

    async update(request, response) {
        const { id } = request.params;
        const { name } = request.body;

        const categoryExists = await CategoriesRepository.findById(id);

        if (!categoryExists) {
            return response.status(404).json({
                error: 'category not found'
            });
        }

        if (!name) {
            return response.status(400).json({
                error: 'Name is required'
            });
        }

        const category = await CategoriesRepository.update(id, {
            name
        });

        response.json(category);
    }

    async delete(request, response) {
        const { id } = request.params;

        await CategoriesRepository.delete(id);

        return response.sendStatus(204);
    }
}

module.exports = new CategoryController();
