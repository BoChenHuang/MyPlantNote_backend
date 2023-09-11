const { expect } = require("chai");
const supertest = require("supertest");
require("../dist/index.bundle");

const api = supertest("http://localhost:3000/api"); // 定義測試的 API 路徑

describe("Article", () => {
  it("Get all article", (done) => {
    api
      .get("/article")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]._id).to.be.a("string");
          expect(res.body[0]).to.have.property("author");
          expect(res.body[0].author).to.be.a("string");
          expect(res.body[0]).to.have.property("title");
          expect(res.body[0].title).to.be.a("string");
          expect(res.body[0]).to.have.property("pictures");
          expect(res.body[0].pictures).to.be.a("Array");
          expect(res.body[0]).to.have.property("plantType");
          expect(res.body[0].plantType).to.be.a("string");
          expect(res.body[0]).to.have.property("content");
          expect(res.body[0].content).to.be.a("string");
          expect(res.body[0]).to.have.property("createDate");
          expect(res.body[0].createDate).to.be.a("string");
          expect(res.body[0]).to.have.property('lastModifiedDate');
          expect(res.body[0].lastModifiedDate).to.be.a("string");
          done();
        }
      });
  });

  it("Get article by id", (done) => {
    api
      .get("/article")
      .query({id: "64eff95e2ed9f8c50ce5c567"})
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).to.have.property("_id");
          expect(res.body._id).to.be.equal("64eff95e2ed9f8c50ce5c567");
          expect(res.body).to.have.property("author");
          expect(res.body.author).to.be.a("string");
          expect(res.body).to.have.property("title");
          expect(res.body.title).to.be.a("string");
          expect(res.body).to.have.property("pictures");
          expect(res.body.pictures).to.be.a("Array");
          expect(res.body).to.have.property("plantType");
          expect(res.body.plantType).to.be.a("string");
          expect(res.body).to.have.property("content");
          expect(res.body.content).to.be.a("string");
          expect(res.body).to.have.property("createDate");
          expect(res.body.createDate).to.be.a("string");
          expect(res.body).to.have.property('lastModifiedDate');
          expect(res.body.lastModifiedDate).to.be.a("string");
          done();
        }
      });
  })

  it("Get personal article", (done) => {
    api
      .get("/article/personal")
      .set("Authorization", `Bearer ${global.token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]._id).to.be.a("string");
          expect(res.body[0]).to.have.property("author");
          expect(res.body[0].author).to.be.a("string");
          expect(res.body[0]).to.have.property("title");
          expect(res.body[0].title).to.be.a("string");
          expect(res.body[0]).to.have.property("pictures");
          expect(res.body[0].pictures).to.be.a("Array");
          expect(res.body[0]).to.have.property("plantType");
          expect(res.body[0].plantType).to.be.a("Object");
          expect(res.body[0]).to.have.property("content");
          expect(res.body[0].content).to.be.a("string");
          expect(res.body[0]).to.have.property("createDate");
          expect(res.body[0].createDate).to.be.a("string");
          expect(res.body[0]).to.have.property('lastModifiedDate');
          expect(res.body[0].lastModifiedDate).to.be.a("string");
          done();
        }
      });
  });
});
