import { Router } from 'express'
import { check } from 'express-validator'

import {
  createPlan,
  getPlanById,
  getPlansByUserId,
  updatePlanById,
  deletePlanById,
  getAllPlans
} from '../controllers/con_plans.js'
import verifyToken from '../middleware/verifyToken.js'

const plansRouter = Router()

plansRouter.get('/all_plans', getAllPlans)

plansRouter.get('/:pid', getPlanById)

plansRouter.get('/user/:uid', getPlansByUserId)

plansRouter.use(verifyToken)

plansRouter.post(
  '/',
  [
    check('title').notEmpty(),
    check('description').isLength({ min: 5 }),
    check('category').notEmpty()
  ],
  createPlan
)

plansRouter.patch(
  '/:pid',
  [
    check('title').notEmpty(),
    check('description').isLength({ min: 5 })
  ],
  updatePlanById
)

plansRouter.delete('/:pid', deletePlanById)

export default plansRouter
