import Joi from "joi";

export default {
  // GET /api/plant
  getPlant: {
    query: Joi.object({
      id: Joi.string().hex().length(24),
    }),
  },
  // POST /api/plant
  createPlant: {
    body: Joi.object({
      name: Joi.string().required(),
      type: Joi.string().hex().length(24).required(),
      startDate: Joi.string(),
      lastWateringDate: Joi.string(),
      wateringPeriod: Joi.string(),
    }),
  },
  // GET /api/plant/personal
  getPersonalPlant: {
    query: Joi.object({
      type: Joi.string().hex().length(24),
    }),
  },
  // DELETE /api/plant/:id
  deletePlant: {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  },
  // FATCH /api/plant/:id
  updatePlant: {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
    body: Joi.object({
      name: Joi.string(),
      type: Joi.string(),
      startDate: Joi.string(),
      lastWateringDate: Joi.string(),
      wateringPeriod: Joi.string(),
    }),
  },
  //GET /api/user
  getUser: {
    query: Joi.object({
      id: Joi.string().hex().length(24),
    }),
  },
  // POST /api/user
  createUser: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().required(),
    }),
  },
  //POST /api/user/login
  userLogin: {
    body: Joi.object({
      email: Joi.string().email().trim().required(),
      password: Joi.string().required(),
    }),
  },
  //PATCH /api/user/
  updateUser: {
    body: Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  // GET /api/article
  getArticle: {
    query: Joi.object({
      id: Joi.string().hex().length(24),
    }),
  },
  // POST /api/article
  createArticle: {
    body: Joi.object({
      title: Joi.string().required(),
      pictures: Joi.array().items(Joi.string().hex().length(24)),
      plantType: Joi.string().hex().length(24).required(),
      content: Joi.string().required(),
    }),
  },
  // PATCH /api/article/:id
  updateArticle: {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
    body: Joi.object({
      title: Joi.string(),
      pictures: Joi.array().items(Joi.string().hex().length(24)),
      plantType: Joi.string().hex().length(24),
      content: Joi.string(),
    }),
  },
  // DELETE /api/article/:id
  deleteArticle: {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  },
  // GET /api/articl/personal
  getPersonalArticle: {
    query: Joi.object({
      type: Joi.string().hex().length(24),
    }),
  },
  // GET /api/note
  getNote: {
    query: Joi.object({
      id: Joi.string().hex().length(24),
    }),
  },
  // POST /api/note/:plantId
  createNote: {
    params: Joi.object({
      plantId: Joi.string().hex().length(24).required(),
    }),
    body: Joi.object({
      title: Joi.string().required(),
      pictures: Joi.array().items(Joi.string().hex().length(24)),
      content: Joi.string().required(),
    }),
  },
  // PATCH /api/note/:id
  updateNote: {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
    body: Joi.object({
      title: Joi.string(),
      pictures: Joi.array().items(Joi.string().hex().length(24)),
      content: Joi.string(),
    }),
  },
  // DELETE /api/note/:id
  deleteNote: {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  },
  // GET /api/picture
  getPicture: {
    query: Joi.object({
      id: Joi.string().hex().length(24),
    }),
  },
  // POST /api/picture/
  createPicture: {
    body: Joi.object({
      pictureList: Joi.array().items(
        Joi.object({
          fileName: Joi.string(),
          fileSize: Joi.string(),
          base64: Joi.string(),
        })
      ),
    }),
  },
  // POST /api/picture/add
  addPictureToTarget: {
    body: Joi.object({
      targets: Joi.array().items(
        Joi.object({
          type: Joi.string(),
          id: Joi.string().hex().length(24),
        })
      ),
      pictureIdList: Joi.array().items(Joi.string().hex().length(24)),
    }),
  },
  // DELETE /api/picture
  deletePicture: {
    body: Joi.object({
      pictureIdList: Joi.array().items(Joi.string().hex().length(24)),
    }),
  },
};
