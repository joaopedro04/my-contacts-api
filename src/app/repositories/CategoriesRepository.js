const db = require('../../database');

class CategoriesRepository {
    async findAll(orderBy) {
        const direction = orderBy === 'desc' ? 'desc' : 'asc';
        const rawQuery = `SELECT * FROM categories ORDER BY name ${direction}`;
        const rows = await db.query(rawQuery);
        return rows;
    }

    async findById(id) {
        const rawQuery = `
				SELECT * FROM categories
				WHERE id = $1
			`;
        const [
            row
        ] = await db.query(rawQuery, [
            id
        ]);
        return row;
    }

    async create({ name }) {
        const rawQuery = `
				INSERT INTO categories(name)
				VALUES($1)
				RETURNING *
			`;
        const [
            row
        ] = await db.query(rawQuery, [
            name
        ]);

        return row;
    }

    async update(id, { name }) {
        const rawQuery = `
				UPDATE categories
				SET name = $1
				WHERE id = $2
				RETURNING *
			`;
        const [
            row
        ] = await db.query(rawQuery, [
            name,
            id
        ]);
        return row;
    }

    async delete(id) {
        const rawQuery = `DELETE FROM categories WHERE id = $1 `;
        const deleteOperation = await db.query(rawQuery, [
            id
        ]);
        return deleteOperation;
    }
}

module.exports = new CategoriesRepository();
