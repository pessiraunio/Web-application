import { v4 } from 'uuid'
import { validationResult } from 'express-validator'

import HttpError from '../models/http-error.js'
import {
  addPlan,
  deletePlanWithId,
  findAllPlans,
  findPlanById,
  findPlansByUser,
  updatePlanWithId
} from '../models/plans.js'

const getPlanById = async (req, res, next) => {
  const planId = req.params.pid
  const plan = await findPlanById(planId)

  if (!plan) {
    return next(new HttpError('Could not find a a plan for the provided id', 404))
  }
  res.json({ plan })
}

const getPlansByUserId = async (req, res, next) => {
  const planCreator = req.params.uid
  const plans = await findPlansByUser(planCreator)

  if (!plans || plans.length === 0) {
    return next(new HttpError('Could not find a plan for the provided user id', 404))
  }

  res.json({ plans })
}

const createPlan = async (req, res, next) => {
  console.log('Here we are!')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid input', 422))
  }

  const { title, description, category, creator } = req.body
  const newPlan = {
    id: v4(), // Using v4 from uuid to create an ID
    title,
    description,
    category,
    creator
  }

  const result = await addPlan(newPlan)
  if (!result) {
    return (new HttpError('Something went wrong creating a plan', 500))
  }

  // Returning the newly created place
  res.status(201).json({ plan: newPlan })
}

// Update Place (title, description)
const updatePlanById = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(HttpError('Invalid values given, please check the data', 422))
  }

  console.log(req.body)
  const { title, description } = req.body
  const planId = req.params.pid

  const plan = await findPlanById(planId)
  console.log(plan)
  if (!plan) {
    return next(new HttpError('Could not find a plan for the provided id.', 404))
  }
  if (plan.creator !== req.userData.userId) {
    return next(new HttpError('Not allowed to update the plan', 401))
  }
  const result = await updatePlanWithId(planId, title, description)
  console.log(result)
  if (!result) {
    return next(HttpError('Could not update the details for the provided id', 404))
  }
  plan.title = title
  plan.description = description

  res.status(200).json({ plan: plan })
}

// Delete Place
const deletePlanById = async (req, res, next) => {
  const planId = req.params.pid

  const plan = await findPlanById(planId)
  if (!plan) {
    return next(new HttpError('Could not find a plan for the provided id.', 404))
  }
  if (plan.creator !== req.userData.userId) {
    return next(new HttpError('Not authorized to delete the plan', 401))
  }

  const result = await deletePlanWithId(planId)
  if (!result) {
    return next(new HttpError('Could not delete the plan the provided id.'), 404)
  }
  res.status(200).json({ message: 'Deleted the plan.' })
}

/* LISÄÄ OMINAISUUS ET TARKISTETAAN ONKO KÄYTTÄJÄ KIRJAUTUNEENA VAI EI JA SEN MUKAA NÄYTETÄÄ TIETOI */

/* OISKO MITÄÄ JOS VAA TESTAA ET LÖYTYYKÖ ID DATABASESTA, TAI JOKU MUU MIETI MITEN ENNENKU TEEET,
ESIM ONKO SAATAVILLA AUTHORIZATIONIA PARAMETREIS TMS */

const getAllPlans = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(HttpError('Invalid values given, please check the data', 422))
  }
  const plans = await findAllPlans(req)
  if (!plans) {
    return next(new HttpError('Could not fetch plans.'), 404)
  }
  res.status(200).json({ plans })
}

export {
  getPlanById,
  getPlansByUserId,
  createPlan,
  updatePlanById,
  deletePlanById,
  getAllPlans
}
