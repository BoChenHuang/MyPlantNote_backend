const { expect } = require("chai");
const supertest = require("supertest");

const api = supertest("http://localhost:3000/api"); // 定義測試的 API 路徑

describe("Note", () => {
  it("Get all notes", (done) => {
    api
      .get("/note")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]._id).to.be.a("string");
          expect(res.body[0]).to.have.property("plantId");
          expect(res.body[0].plantId).to.be.a("string");
          expect(res.body[0]).to.have.property("author");
          expect(res.body[0].author).to.be.a("string");
          expect(res.body[0]).to.have.property("title");
          expect(res.body[0].title).to.be.a("string");
          expect(res.body[0]).to.have.property("pictures");
          expect(res.body[0].pictures).to.be.a("Array");
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
