// 1. qualities и professions должны быть в БД сразу
// 2. Они равны mock-данным
const Profession = require("../models/Profession");
const Quality = require("../models/Quality");
const professionMock = require("../mock/professions.json");
const qualityMock = require("../mock/qualities.json");

module.exports = async () => {
  // Выборка все профессий из БД
  const professions = await Profession.find();
  // Если длина не совпадает, то инициализируем его из мок-данных
  if (professions.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock);
  }

  const qualities = await Quality.find();
  if (qualities.length !== qualityMock.length) {
    await createInitialEntity(Quality, qualityMock);
  }
};
async function createInitialEntity(Model, data) {
  await Model.collection.drop(); // Чистим коллекцию от данных
  // ждем пока выполнятся все промисы в маппинге
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id; // затираем id, БД сама его назначит
        const newItem = new Model(item);
        await newItem.save(); // сохранение в монгоДБ
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
