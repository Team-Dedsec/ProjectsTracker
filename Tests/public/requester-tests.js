/* globals chai describe it requester expect */

const expect = chai.expect;

describe("ProjectsTracker/public/js/requester.js tests", () => {
    const mockedJquery = (function () {
        let lastRequest = {};

        function ajax(request) {
            lastRequest = request;
            request.success();
        }

        function getLastRequest() {
            let temp = lastRequest;
            lastRequest = {};
            return temp;
        }

        return {
            ajax,
            getLastRequest
        };
    }());

    const requesterInstance = requester.getInstance(mockedJquery),
        defaultExpectedUrl = "./api/auth",
        typeOfFunction = "function",
        typeOfPromise = "Promise",
        defaultExpectedHeaders = { "x-auth-token": "OOO" },
        defaultExpectedData = { "name": "Pesho" },
        expectedPostMethod = "POST",
        expectedGetMethod = "GET",
        expectedPutmethod = "PUT";

    describe("get tests", () => {
        it("Expect get to exist and be a function.", () => {
            expect(requesterInstance.get).to.exist;
            expect(requesterInstance.get).to.be.a(typeOfFunction);
        });

        it("Expect get to call ajax method with correct parameters.", (done) => {
            requesterInstance.get(defaultExpectedUrl)
                .then(() => {
                    let result = mockedJquery.getLastRequest();

                    expect(result.url).to.equal(defaultExpectedUrl);
                    expect(result.method).to.equal(expectedGetMethod);
                })
                .then(done, done);
        });

        it("Expect get to return a promise.", () => {
            let result = requesterInstance.get({ url: defaultExpectedUrl });

            expect(result).to.be.a(typeOfPromise);
        });
    });

    describe("putJSON tests", () => {
        it("Expect putJSON to exist and be a function.", () => {
            expect(requesterInstance.putJSON).to.exist;
            expect(requesterInstance.putJSON).to.be.a(typeOfFunction);
        });

        it("Expect putJSON to call ajax method with correct parameters.", (done) => {
            requesterInstance.putJSON(defaultExpectedUrl, defaultExpectedData, defaultExpectedHeaders)
                .then(() => {
                    let requestResult = mockedJquery.getLastRequest();

                    expect(requestResult.url).to.equal(defaultExpectedUrl);
                    expect(requestResult.method).to.equal(expectedPutmethod);
                    expect(requestResult.headers).to.equal(defaultExpectedHeaders);
                    expect(requestResult.data).to.equal(JSON.stringify(defaultExpectedData));
                })
                .then(done, done);
        });

        it("Expect putJSON to return a promise.", () => {
            let result = requesterInstance.putJSON(defaultExpectedUrl);

            expect(result).to.be.an(typeOfPromise);
        });
    });

    describe("postJSON tests", () => {
        it("Expect postJSON to exist and be a function.", () => {
            expect(requesterInstance.postJSON).to.exist;
            expect(requesterInstance.postJSON).to.be.a(typeOfFunction);
        });

        it("Expect postJSON to call ajax method with correct parameters.", (done) => {
            requesterInstance.postJSON(defaultExpectedUrl, defaultExpectedData, defaultExpectedHeaders)
                .then(() => {
                    let requestResult = mockedJquery.getLastRequest();

                    expect(requestResult.url).to.equal(defaultExpectedUrl);
                    expect(requestResult.method).to.equal(expectedPostMethod);
                    expect(requestResult.headers).to.equal(defaultExpectedHeaders);
                    expect(requestResult.data).to.equal(JSON.stringify(defaultExpectedData));
                })
                .then(done, done);
        });

        it("Expect postJSON to return a promise.", () => {
            let result = requesterInstance.postJSON(defaultExpectedUrl);

            expect(result).to.be.a(typeOfPromise);
        });
    });

    describe("getJSON tests", () => {
        it("Expect getJSON to exist and be a function.", () => {
            expect(requesterInstance.getJSON).to.exist;
            expect(requesterInstance.getJSON).to.be.a(typeOfFunction);
        });

        it("Expect getJSON to call ajax method with correct parameters.", (done) => {
            requesterInstance.getJSON(defaultExpectedUrl, defaultExpectedHeaders)
                .then(() => {
                    let requestResult = mockedJquery.getLastRequest();

                    expect(requestResult.url).to.equal(defaultExpectedUrl);
                    expect(requestResult.method).to.equal(expectedGetMethod);
                    expect(requestResult.headers).to.equal(defaultExpectedHeaders);
                })
                .then(done, done);
        });

        it("Expect getJSON to return a promise.", () => {
            let result = requesterInstance.getJSON(defaultExpectedUrl);

            expect(result).to.be.a(typeOfPromise);
        });
    });
});