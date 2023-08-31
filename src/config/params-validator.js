import Joi from "joi";

export default {
    // GET /api/plant
    getPlant: {
        query: Joi.object({
            id: Joi.string().hex().length(24)
        })
    },
    // POST /api/plant
    createPlant: {
        body: Joi.object({
            name: Joi.string().required(),
            type: Joi.string().hex().length(24).required(),
            startDate: Joi.string(),
            lastWateringDate: Joi.string(),
            wateringPeriod: Joi.string(),
        })
    },
    // GET /api/plant/personal
    getPersonalPlant: {
        query: Joi.object({
            type: Joi.string().hex().length(24)
        })
    },
    // DELETE /api/plant/:id
    deletePlant: {
        params: Joi.object({
            id: Joi.string().hex().length(24)
        })
    },
    // FATCH /api/plant/:id
    updatePlant: {
        params: Joi.object({
            id: Joi.string().hex().length(24)
        }),
        body: Joi.object({
            name: Joi.string(),
            type: Joi.string(),
            startDate: Joi.string(),
            lastWateringDate: Joi.string(),
            wateringPeriod: Joi.string(),
        })
    },
    // POST /api/article
    createArticle: {
      body: Joi.object({
        user_id: Joi.number().required(), // 數字＋必填
        article_title: Joi.string().required(), // 字串＋必填
        article_tag: Joi.string().required(), // 字串＋必填
        article_content: Joi.string().min(20).required() // 文章長度至少20字
      })
    },
    // POST /api/user
    createUser: {
      body: Joi.object({
        user_name: Joi.string().required(), // 字串＋必填
        user_mail: Joi.string().email().trim().required(), // 限定email格式並移除多餘空白
        user_password: Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required() // 最小長度6最大30，只允許英文大小寫和數字
      })
    }
  };