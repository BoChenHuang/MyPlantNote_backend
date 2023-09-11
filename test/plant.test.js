const { expect } = require("chai");
const supertest = require("supertest");
require("../dist/index.bundle");

const api = supertest("http://localhost:3000/api"); // 定義測試的 API 路徑
let token; // 全域變數等待 before() 取得 Token

before(function (done) {
  this.timeout(7000);
  api
    .post("/user/login")
    .set("Accept", "application/json")
    .send({
      email: "123@gmail.com",
      password: "123",
    })
    .expect(200)
    .end((err, res) => {
      if (err) done(err);
      else {
        global.token = res.body.token; // 登入成功取得 JWT
        done();
      }
    });
});

describe("Plant", () => {
  it("Get all plants", (done) => {
    api
      .get("/plant")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body[0]).to.have.property("_id");
        expect(res.body[0]._id).to.be.a("string");
        expect(res.body[0]).to.have.property("type");
        expect(res.body[0].type).to.be.a("string");
        expect(res.body[0]).to.have.property("owner");
        expect(res.body[0].owner).to.be.a("string");
        expect(res.body[0]).to.have.property("startDate");
        expect(res.body[0].startDate).to.be.a("string");
        expect(res.body[0]).to.have.property("lastWateringDate");
        expect(res.body[0].lastWateringDate).to.be.a("string");
        expect(res.body[0]).to.have.property("notes");
        expect(res.body[0].notes).to.be.a("Array");
        expect(res.body[0]).to.have.property("pictures");
        expect(res.body[0].pictures).to.be.a("Array");
        expect(res.body[0]).to.have.property("createDate");
        expect(res.body[0].createDate).to.be.a("string");
        expect(res.body[0]).to.have.property("lastModifiedDate");
        expect(res.body[0].lastWateringDate).to.be.a("string");
        done();
      });
  });

  it("Get plants by id", (done) => {
    const id = "64eeed5986534943180d9b90";
    api
      .get(`/plant`)
      .query({ id: "64eeed5986534943180d9b90" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).to.have.property("_id");
          expect(res.body._id).to.be.equal("64eeed5986534943180d9b90");
          expect(res.body).to.have.property("type");
          expect(res.body.type).to.be.a("string");
          expect(res.body).to.have.property("owner");
          expect(res.body.owner).to.be.a("string");
          expect(res.body).to.have.property("startDate");
          expect(res.body.startDate).to.be.a("string");
          expect(res.body).to.have.property("lastWateringDate");
          expect(res.body.lastWateringDate).to.be.a("string");
          expect(res.body).to.have.property("notes");
          expect(res.body.notes).to.be.a("Array");
          expect(res.body).to.have.property("pictures");
          expect(res.body.pictures).to.be.a("Array");
          expect(res.body).to.have.property("createDate");
          expect(res.body.createDate).to.be.a("string");
          expect(res.body).to.have.property("lastModifiedDate");
          expect(res.body.lastWateringDate).to.be.a("string");
          done();
        }
      });
  });

  it("Get person plant by token", (done) => {
    api
      .get("/plant/personal")
      .set("Authorization", `Bearer ${global.token}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]._id).to.be.a("string");
          expect(res.body[0]).to.have.property("type");
          expect(res.body[0].type).to.be.a("Object");
          expect(res.body[0]).to.have.property("owner");
          expect(res.body[0].owner).to.be.a("string");
          expect(res.body[0]).to.have.property("startDate");
          expect(res.body[0].startDate).to.be.a("string");
          expect(res.body[0]).to.have.property("lastWateringDate");
          expect(res.body[0].lastWateringDate).to.be.a("string");
          expect(res.body[0]).to.have.property("notes");
          expect(res.body[0].notes).to.be.a("Array");
          expect(res.body[0]).to.have.property("pictures");
          expect(res.body[0].pictures).to.be.a("Array");
          expect(res.body[0]).to.have.property("createDate");
          expect(res.body[0].createDate).to.be.a("string");
          expect(res.body[0]).to.have.property("lastModifiedDate");
          expect(res.body[0].lastWateringDate).to.be.a("string");
          done();
        }
      });
  });
});
