const { expect } = require("chai");
const supertest = require("supertest");
require("../dist/index.bundle");

const api = supertest("http://localhost:3000/api"); // 定義測試的 API 路徑

describe("Picture", () => {
  it("Get all picture", (done) => {
    api
      .get("/picture")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]._id).to.be.a("string");
          expect(res.body[0]).to.have.property("fileName");
          expect(res.body[0].fileName).to.be.a("string");
          expect(res.body[0]).to.have.property("fileSize");
          expect(res.body[0].fileSize).to.be.a("number");
          expect(res.body[0]).to.have.property("base64");
          expect(res.body[0].base64).to.be.a("string");
          done();
        }
      });
  });

  it("Get all picture by id", (done) => {
    api
      .get("/picture")
      .query({id: "64f0498805272ca8fccf0348"})
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).to.have.property("_id");
          expect(res.body._id).to.be.a("string");
          expect(res.body).to.have.property("fileName");
          expect(res.body.fileName).to.be.a("string");
          expect(res.body).to.have.property("fileSize");
          expect(res.body.fileSize).to.be.a("number");
          expect(res.body).to.have.property("base64");
          expect(res.body.base64).to.be.a("string");
          done();
        }
      });
  });
});
