const db = require('../../database');

class ContactsRepository {
    async findAll(orderBy) {
        const direction = orderBy === 'desc' ? 'desc' : 'asc';
        const rawQuery = `
			SELECT
				contacts.id,
				contacts.name,
				contacts.email,
				contacts.phone,
				json_build_object(
					'id', category.id,
					'name', category.name
				) as "category"
			FROM contacts
			LEFT JOIN categories category ON contacts.category_id = category.id
			ORDER BY contacts ${direction}
		`;
        const rows = await db.query(rawQuery);
        return rows;
    }

    async findById(id) {
        const rawQuery = `
			SELECT
				contacts.id,
				contacts.name,
				contacts.email,
				contacts.phone,
				json_build_object(
					'id', category.id,
					'name', category.name
				) as "category"
			FROM contacts
			LEFT JOIN categories category ON contacts.category_id = category.id
			WHERE id = $1
		`;
        const [
            row
        ] = await db.query(rawQuery, [
            id
        ]);
        return row;
    }

    async findByEmail(email) {
        const rawQuery = `
			SELECT * FROM contacts
			WHERE email = $1
		`;
        const [
            row
        ] = await db.query(rawQuery, [
            email
        ]);
        return row;
    }

    async create({
        name,
        email,
        phone,
        category_id
    }) {
        const rawQuery = `
			INSERT INTO contacts(name, email, phone, category_id)
			VALUES($1, $2, $3, $4)
			RETURNING *
		`;
        const [
            row
        ] = await db.query(rawQuery, [
            name,
            email,
            phone,
            category_id
        ]);

        return row;
    }

    async delete(id) {
        const rawQuery = `DELETE FROM contacts WHERE id = $1 `;
        const deleteOperation = await db.query(rawQuery, [
            id
        ]);
        return deleteOperation;
    }

    async update(id, {
        name,
        email,
        phone,
        category_id
    }) {
        const rawQuery = `
			UPDATE contacts
			SET name = $1, email = $2, phone = $3, category_id = $4
			WHERE id = $5
			RETURNING *
		`;
        const [
            row
        ] = await db.query(rawQuery, [
            name,
            email,
            phone,
            category_id,
            id
        ]);
        return row;
    }
}

module.exports = new ContactsRepository();
