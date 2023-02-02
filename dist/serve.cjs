"use strict";require("reflect-metadata");var rc=require("routing-controllers"),td=require("typedi"),routingControllersOpenapi=require("routing-controllers-openapi"),classValidator=require("class-validator"),classValidatorJsonschema=require("class-validator-jsonschema"),dotenv=require("dotenv"),logger$1=require("pino"),Router=require("koa-router"),serve=require("koa-static"),mount=require("koa-mount"),to=require("typeorm"),morgan=require("koa-morgan"),koa2SwaggerUi=require("koa2-swagger-ui"),uuid=require("uuid"),httpStatus=require("http-status");function _interopNamespaceDefault(a){var r=Object.create(null);return a&&Object.keys(a).forEach(function(e){var t;"default"!==e&&(t=Object.getOwnPropertyDescriptor(a,e),Object.defineProperty(r,e,t.get?t:{enumerable:!0,get:function(){return a[e]}}))}),r.default=a,Object.freeze(r)}var rc__namespace=_interopNamespaceDefault(rc),td__namespace=_interopNamespaceDefault(td),dotenv__namespace=_interopNamespaceDefault(dotenv),to__namespace=_interopNamespaceDefault(to);function __decorate(e,t,a,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,a,r);else for(var i=e.length-1;0<=i;i--)(o=e[i])&&(s=(n<3?o(s):3<n?o(t,a,s):o(t,a))||s);return 3<n&&s&&Object.defineProperty(t,a,s),s}function __param(a,r){return function(e,t){r(e,t,a)}}function __metadata(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}class Healthz{status}__decorate([classValidator.IsBoolean(),__metadata("design:type",String)],Healthz.prototype,"status",void 0);class ValidationErrors{message;errors}__decorate([classValidator.IsString(),__metadata("design:type",String)],ValidationErrors.prototype,"message",void 0),__decorate([classValidator.IsArray(),__metadata("design:type",Array)],ValidationErrors.prototype,"errors",void 0);class League{id;name;type;createdAt;updatedAt;deletedAt}__decorate([classValidator.IsOptional(),classValidator.IsString(),__metadata("design:type",String)],League.prototype,"id",void 0),__decorate([classValidator.IsString(),__metadata("design:type",String)],League.prototype,"name",void 0),__decorate([classValidator.IsString(),__metadata("design:type",String)],League.prototype,"type",void 0),__decorate([classValidator.IsOptional(),classValidator.IsDate(),__metadata("design:type",Date)],League.prototype,"createdAt",void 0),__decorate([classValidator.IsOptional(),classValidator.IsDate(),__metadata("design:type",Date)],League.prototype,"updatedAt",void 0),__decorate([classValidator.IsOptional(),classValidator.IsDate(),__metadata("design:type",Object)],League.prototype,"deletedAt",void 0);var schemas=classValidatorJsonschema.validationMetadatasToSchemas({classTransformerMetadataStorage:require("class-transformer/cjs/storage").defaultMetadataStorage});let PinoLogger=class{logger;constructor(){this.logger=logger$1({transport:{target:"pino-pretty"}})}info(e,t={}){t=this.logger.child(t);"testing"!==process.env.NODE_ENV&&t.info(e)}error(e,t={}){t=this.logger.child(t);"testing"!==process.env.NODE_ENV&&t.error(e)}warn(e,t={}){t=this.logger.child(t);"testing"!==process.env.NODE_ENV&&t.warn(e)}};var PinoLogger$1=PinoLogger=__decorate([td.Service(),__metadata("design:paramtypes",[])],PinoLogger);dotenv__namespace.config();const logger=new PinoLogger$1,infrastructure={infra:{logger:logger}};function die(e){if("string"==typeof e)throw new Error(e);throw e}dotenv__namespace.config();const config={environment:process.env.NODE_ENV??die('Environment variable "NODE_ENV" wasn\'t defined!'),port:process.env.RESTAPI_PORT??die('Environment variable "RESTAPI_PORT" wasn\'t defined!'),version:process.env.RESTAPI_VERSION??die('Environment variable "RESTAPI_VERSION" wasn\'t defined!'),databaseName:process.env.DATABASE_NAME??die('Environment variable "DATABASE_NAME" wasn\'t defined!'),databaseUser:process.env.DATABASE_USER??die('Environment variable "DATABASE_USER" wasn\'t defined!'),databasePassword:process.env.DATABASE_PASSWORD??die('Environment variable "DATABASE_PASSWORD" wasn\'t defined!'),databaseHost:process.env.DATABASE_HOST??die('Environment variable "DATABASE_HOST" wasn\'t defined!'),databasePort:process.env.DATABASE_PORT??die('Environment variable "DATABASE_PORT" wasn\'t defined!')};class Swagger{static spec}let Docs=class{async _index(){return Swagger.spec}};__decorate([rc.Get("/docs"),rc.HttpCode(200),__metadata("design:type",Function),__metadata("design:paramtypes",[]),__metadata("design:returntype",Promise)],Docs.prototype,"_index",null);var Docs$1=Docs=__decorate([rc.Controller("/api/v1"),td.Service()],Docs);let HealthzController$2=class{logger;constructor(){this.logger=infrastructure.infra.logger}async execute(){return this.logger.info("Healthz endpoint executed"),{status:"ok"}}},HealthzController=class{healthzHandler;constructor(){this.healthzHandler=new HealthzController$2}async execute(){return this.healthzHandler.execute()}};__decorate([routingControllersOpenapi.OpenAPI({summary:'A simple "pong" like action that returns, used to ping the server.',responses:{200:{description:"OK - The server is alive",content:{"application/json":{schema:schemas.Healthz}}}}}),rc.HttpCode(200),rc.Get("/healthz"),__metadata("design:type",Function),__metadata("design:paramtypes",[]),__metadata("design:returntype",Promise)],HealthzController.prototype,"execute",null);var HealthzController$1=HealthzController=__decorate([rc.Controller("/api/v1"),td.Service(),__metadata("design:paramtypes",[])],HealthzController);let LeagueEntity=class extends to.BaseEntity{id;name;type;createdAt;updatedAt;deletedAt};__decorate([to.PrimaryColumn("uuid"),__metadata("design:type",String)],LeagueEntity.prototype,"id",void 0),__decorate([to.Column(),__metadata("design:type",String)],LeagueEntity.prototype,"name",void 0),__decorate([to.Column(),__metadata("design:type",String)],LeagueEntity.prototype,"type",void 0),__decorate([to.CreateDateColumn(),__metadata("design:type",Date)],LeagueEntity.prototype,"createdAt",void 0),__decorate([to.UpdateDateColumn(),__metadata("design:type",Date)],LeagueEntity.prototype,"updatedAt",void 0),__decorate([to.DeleteDateColumn({nullable:!0,default:null}),__metadata("design:type",Object)],LeagueEntity.prototype,"deletedAt",void 0);var LeagueEntity$1=LeagueEntity=__decorate([to.Entity("league")],LeagueEntity);class LeagueRepo extends to.BaseEntity{async add(e){return LeagueEntity$1.save(e)}async findById(e){return LeagueEntity$1.findOne({where:{id:e}})}async findAll(e){return LeagueEntity$1.find({where:e})}}const leagueRepo=new LeagueRepo;class CreateLeagueService{logger;repo;constructor(){this.logger=infrastructure.infra.logger,this.repo=leagueRepo}async execute(e){e.id=uuid.v4();e=await this.repo.add(e);return this.logger.info("Created league "+e.name,{league:e}),e}}class CreateLeagueHandler{createLeagueService;constructor(){this.createLeagueService=new CreateLeagueService}async execute(e){return this.createLeagueService.execute(e)}}let FindLeagueService$1=class{logger;repo;constructor(){this.logger=infrastructure.infra.logger,this.repo=leagueRepo}async find(e){e=await this.repo.findById(e);return this.logger.info("Finded league "+e.name,{league:e}),e}};class FindLeagueHandler{findLeagueService;constructor(){this.findLeagueService=new FindLeagueService$1}async execute(e){return this.findLeagueService.find(e)}}class FindLeagueService{logger;repo;constructor(){this.logger=infrastructure.infra.logger,this.repo=new LeagueRepo}async findAll(e){e=await this.repo.findAll(e);return this.logger.info("Finded leagues",{leagues:e}),e}}class FindAllLeagueHandler{findAllLeagueService;constructor(){this.findAllLeagueService=new FindLeagueService}async execute(e){return this.findAllLeagueService.findAll(e)}}let LeagueController=class{createLeagueHandler;findLeagueHandler;findAllLeagueHandler;logger;constructor(){this.createLeagueHandler=new CreateLeagueHandler,this.findLeagueHandler=new FindLeagueHandler,this.findAllLeagueHandler=new FindAllLeagueHandler,this.logger=infrastructure.infra.logger}async create(e){return this.logger.info("Create League endpoint executed"),this.createLeagueHandler.execute(e)}async find(e){return this.logger.info("Find League endpoint executed",{id:e}),this.findLeagueHandler.execute(e)}async findAll(e){return this.logger.info("Find All Leagues endpoint executed",{query:e}),this.findAllLeagueHandler.execute(e)}};__decorate([routingControllersOpenapi.OpenAPI({summary:"Create league endpoint.",requestBody:{content:{"application/json":{schema:schemas.League}}},responses:{201:{description:"Creation result",content:{"application/json":{schema:schemas.League}}},400:{description:"Validation Errors",content:{"application/json":{schema:schemas.ValidationErrors}}}}}),rc.HttpCode(201),rc.Post("/league"),__param(0,rc.Body({required:!0,validate:!0})),__metadata("design:type",Function),__metadata("design:paramtypes",[League]),__metadata("design:returntype",Promise)],LeagueController.prototype,"create",null),__decorate([routingControllersOpenapi.OpenAPI({summary:"Find one league by id endpoint.",requestBody:{content:{"application/json":{schema:schemas.League}}},responses:{200:{description:"Find result",content:{"application/json":{schema:schemas.League}}}}}),rc.HttpCode(200),rc.Get("/league/:id"),__param(0,rc.Param("id")),__metadata("design:type",Function),__metadata("design:paramtypes",[String]),__metadata("design:returntype",Promise)],LeagueController.prototype,"find",null),__decorate([routingControllersOpenapi.OpenAPI({summary:"Finded all leagues by query.",requestBody:{content:{"application/json":{schema:schemas.League}}},responses:{200:{description:"Finded all leagues by query",type:"array",items:schemas.League}}}),rc.HttpCode(200),rc.Get("/league"),__param(0,rc.Body()),__metadata("design:type",Function),__metadata("design:paramtypes",[Object]),__metadata("design:returntype",Promise)],LeagueController.prototype,"findAll",null);var RoutingControllerServer_1,LeagueController$1=LeagueController=__decorate([rc.Controller("/api/v1"),td.Service(),__metadata("design:paramtypes",[])],LeagueController);let CorsHandler=class{async use(e,t){e.set("Access-Control-Allow-Origin","*"),e.set("Access-Control-Allow-Credentials","true"),e.set("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),e.set("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS"),await t()}},ErrorHandler=(CorsHandler=__decorate([td.Service(),rc.Middleware({type:"before"})],CorsHandler),class{async use(t,a){try{await a()}catch(e){console.log(e.message,e.stack),infrastructure.infra.logger.error("Error: "+e.message,{stack:e.stack,errors:e.errors});a=e.httpCode||httpStatus.INTERNAL_SERVER_ERROR;t.status=a,t.body={message:e.message,errors:e.errors||{}}}}}),RoutingControllerServer=(ErrorHandler=__decorate([td.Service(),rc.Middleware({type:"before"})],ErrorHandler),RoutingControllerServer_1=class{server;app;logger;router;constructor(e){this.logger=e,this.router=new Router,this.app=rc__namespace.createKoaServer({middlewares:[ErrorHandler,CorsHandler],controllers:[HealthzController$1,LeagueController$1,Docs$1],defaultErrorHandler:!1,cors:!0})}static async create(e){e=new RoutingControllerServer_1(e);return await e.configure(),e}async stop(){return new Promise((e,t)=>{this.server?.close(),this.server.on("close",()=>{e(!0)}),this.server.on("error",e=>{t(e)})})}start(){this.server=this.app.listen(config.port,()=>{this.logger.info(`Listening on port ${config.port}...`)})}async configure(){this.app.use((new CorsHandler).use),this.app.use((new ErrorHandler).use),this.router.get("/docs",koa2SwaggerUi.koaSwagger({title:"API Docs",swaggerOptions:{url:"/api/v1/docs"}})),this.app.use(morgan("dev")),this.app.use(mount("/images/",serve(__dirname+"/../public/images/"))),this.app.use(this.router.routes()).use(this.router.allowedMethods()),await new to__namespace.DataSource({type:"postgres",database:config.databaseName,synchronize:!0,host:config.databaseHost,port:parseInt(config.databasePort),username:config.databaseUser,password:config.databasePassword,entities:[LeagueEntity$1]}).initialize().then(async()=>this.databaseReady()).catch(e=>{throw this.logger.error("Start database fail: "+e.message,{stack:e.stack}),e})}async databaseReady(){this.logger.info("Database ready...")}});RoutingControllerServer=RoutingControllerServer_1=__decorate([td.Service(),__metadata("design:paramtypes",[Object])],RoutingControllerServer);const httpServer=async()=>RoutingControllerServer.create(infrastructure.infra.logger);class App{static async main(){process.on("uncaughtException",e=>{console.error(e)}),process.on("unhandledRejection",e=>{console.error(e)});var e=await httpServer();return await e.start(),e}}rc__namespace.useContainer(td__namespace.Container);const storage=rc__namespace.getMetadataArgsStorage(),spec=routingControllersOpenapi.routingControllersToSpec(storage,{},{definitions:schemas});Swagger.spec=spec;var index=App.main();module.exports=index;
