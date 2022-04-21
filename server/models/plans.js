import pool from '../database/db.js'

const addPlan = async (plan) => {
  const result = await pool.query('INSERT INTO plans (id, title, description, category, creator, copied, originalowner) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [plan.id, plan.title, plan.description, plan.category, plan.creator, plan.copied, plan.originalowner])
  console.log(result)
  return result.rows
}
const findAllPlans = async (req) => {
  const plans = await pool.query('SELECT * FROM plans')
  console.log(plans)
  return plans.rows
}

const findPlansByUser = async (planId) => {
  const plans = await pool.query('SELECT * FROM plans WHERE creator=$1', [planId])
  console.log(plans)
  return plans.rows
}

const findPlanById = async (planId) => {
  const plans = await pool.query('SELECT * FROM plans WHERE id=$1', [planId])
  console.log('PLANS', plans)
  return plans.rows[0]
}

const updatePlanWithId = async (planId, title, description) => {
  const result = await pool.query('UPDATE plans SET title=$1, description=$2 WHERE id=$3', [title, description, planId])
  return result.rowCount !== 0
}

const deletePlanWithId = async (planId) => {
  const result =
        await pool.query('DELETE FROM plans WHERE id=$1', [planId])
  console.log('DELETE', result)
  return result.rowCount !== 0
}

export {
  addPlan,
  findPlansByUser,
  findPlanById,
  updatePlanWithId,
  deletePlanWithId,
  findAllPlans
}
