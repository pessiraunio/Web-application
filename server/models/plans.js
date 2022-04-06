import pool from '../database/db.js'

const addPlan = async (place) => {
    const result = await pool.query('INSERT INTO plans (id, title, description, category, creator) VALUES ($1, $2, $3, $4, $5)',
    [place.id, place.title, place.description, place.category, place.creator])
    console.log(result)
    return result.rows
}

const findPlansByUser = async (userId) => {
    const places = await pool.query('SELECT * FROM plans WHERE creator=$1', [planId])
    console.log(plans)
    return places.rows
}

const findPlanById = async (planId) => {
    const places = await pool.query('SELECT * FROM plans WHERE id=$1', [planId])
    console.log('PLACES', plans)
    return places.rows[0]
}

const updatePlanWithId = async (planId, title, description) => {
    const result = await pool.query('UPDATE plans SET title=$1, description=$2 WHERE id=$3', [title, description, planId])
    return result.rowCount !== 0
}

const deletePlanWithId = async (planId) => {
    const result =
        await pool.query('DELETE FROM places WHERE id=$1', [planId])
    console.log('DELETE', result)
    return result.rowCount !== 0
}





export {
    addPlan,
    findPlansByUser,
    findPlanById,
    updatePlanWithId,
    deletePlanWithId
}