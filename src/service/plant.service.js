import Plant from "../models/plant";

export default {
  async update(queryParams, data) {
    // 濾掉空字串
    const updateData = {
      name: data.name ? data.name : undefined,
      type: data.type ? data.type : undefined,
      startDate: data.startDate ? data.startDate : undefined,
      lastWateringDate: data.lastWateringDate ? data.lastWateringDate : undefined,
      wateringPeriod: data.wateringPeriod ? data.wateringPeriod : undefined
    };

    const plant = await Plant.findOneAndUpdate(queryParams, updateData, {returnDocument: "after"});
    return plant;
  },
};
