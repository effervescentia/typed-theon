declare namespace theon {
  interface MidwarePool { }

  class Request extends Base {
    pipes: any[];
    dispatcher: any;
    _client: entities.Client & { store: Store };

    /**
     * Defines the root URL.
     */
    url(url: string): this;

    /**
     * Defines the URL path.
     */
    path(path: string): this;

    /**
     * Defines the base URL path.
     */
    basePath(path: string): this;

    /**
     * Defines the HTTP method to be used.
     */
    method(method: string): this;

    /**
     * Registers a new path param.
     */
    param(name: string, value: string | number): this;

    /**
     * Registers multiple path params.
     */
    params(params: string | any, value?: string | number): this;

    /**
     * Generic method to persist fields by type.
     */
    persistField(type: string, name: string, value: string | number): this;

    /**
     * Registers a persistent path param.
     */
    persistParam(name: string, value: string | number): this;

    /**
     * Registers a set of persistent path params.
     */
    persistParams(params: string | any, value?: string | number): this;

    /**
     * Unset param by key.
     */
    unsetParam(name: string): this;

    /**
     * Reset params, removing old values and defining new ones.
     */
    setParams(params: any): this;

    /**
     * Defines a query param by key and value.
     */
    query(key: string, value: string | number): this;

    /**
     * Defines a query param by key and value.
     */
    queryParam(name: string, value: string | number): this;

    /**
     * Unset a query param by key.
     */
    unsetQuery(key: string): this;

    /**
     * Persists a query param by key and value.
     */
    persistQueryParam(name: string, value: string | number): this;

    /**
     * Persists a set of query params.
     */
    persistQuery(query: any | string, value?: string | number): this;
    persistQueryParams(query: any | string, value?: string | number): this;

    /**
     * Reset query params, removing old params and defining a new ones.
     */
    setQuery(query: any);

    /**
     * Sets a header field by name and value.
     */
    set(name: string, value: string | number): this;
    header(name: string, value: string | number): this;

    /**
     * Removes a header field by name.
     */
    unset(name: string): this;
    removeHeader(name: string): this;

    /**
     * Defines a set of headers.
     */
    headers(headers: any | string, value?: string | number): this;

    /**
     * Reset headers, removing old fields and defining a new ones.
     */
    setHeaders(headers: any): this;

    /**
     * Persist header by name and value.
     */
    persistHeader(name: string, value: string | number): this;

    /**
     * Persist a set of headers.
     */
    persistHeaders(headers: any | string, value?: string | number): this;

    /**
     * Defines request MIME content type format.
     */
    format(type: string): this;

    /**
     * Defines the response MIME content type.
     */
    type(type: string): this;
    mimeType(type: string): this;

    /**
     * Defines accept MIME content type header.
     */
    accept(type: string): this;

    /**
     * Defines the request body payload.
     */
    send(body?: string | any): this;

    /**
     * Defines a cookie by name and value.
     */
    cookie(name: string, value: string | number): this;

    /**
     * Deletes a cookie field by name.
     */
    unsetCookie(name: string): this;

    /**
     * Defines the basic HTTP authentication based on user and password.
     */
    auth(user: string, password: string): this;

    /**
     * Dispatches the current HTTP request generating a new network transaction.
     */
    dispatch(cb: Function): this;

    /**
     * Ends the current HTTP request and triggers the network dispatcher.
     */
    end(cb: Response.Handler): this;
    done(cb: Response.Handler): this;

    /**
     * Ends the current HTTP request and triggers the network dispatcher.
     */
    then(success: Function, error: Function): this;

    /**
     * Defines a function to catch the error.
     */
    catch(error: Function): this;

    /**
     * Attaches a new writable stream as target.
     */
    pipe(stream: any): this;

    /**
     * Attaches a body as readable stream source.
     */
    stream(stream: any): this;
    bodyStream(stream: any): this;

    /**
     * Returns the request as raw mode object.
     */
    raw(): any;

    /**
     * Clone the current request params and configuration.
     */
    clone(): Request;

    /**
     * Creates a new request based on the existent one, optionally passing a custom context.
     */
    newRequest(ctx: Context): this;
  }

  namespace Request {
    interface Interceptor extends Middleware { }

    interface Validator extends Middleware { }

    interface Hook extends Middleware { }

    interface Evaluator extends Middleware { }

    interface Middleware {
      (request: Context, response: Response, next: Next): void;
    }

    interface Next {
      (err?: Error | string | 'intercept', data?: any): void;
    }
  }

  class Response {
    req: Request & { opts: any; body: any; };
    store?: Store;
    client?: entities.Client;
    orig: any;
    type: string;
    error: any;
    headers: {};
    typeParams: {};
    status: number;
    statusType: number;
    statusCode: number;
    statusText: string;
    text: string;
    body: any;
    json: string;

    constructor(req: Request);

    /**
     * Defines agent-specific response object.
     */
    setOriginalResponse(orig: any): this;

    /**
     * Defines response body data.
     */
    setBody(body: string | any): this;

    /**
     * Defines response body data.
     */
    get(name: string): string | number;

    /**
     * Defines response HTTP headers.
     */
    setHeaders(headers: any): this;

    /**
     * Defines the response body content type.
     */
    setType(contentType: string): this;

    /**
     * Defines the response status code with additional sugar fields.
     */
    setStatus(status: number): this;

    /**
     * Defines the response status text.
     */
    setStatusText(text: string): this;

    /**
     * Return a normalized error object.
     */
    toError(): Error;
  }

  namespace Response {
    interface Handler {
      (err?: Error, response?: Response): void;
    }

    interface Mapper {
      (body: any, next: Request.Next): void;
    }
  }

  class Context {
    body: string | any;
    stream: any;
    method: string;
    parent?: Context;
    opts: any;
    query: { [key: string]: string | number };
    params: { [key: string]: any };
    headers: { [key: string]: string | number };
    cookies: { [key: string]: string | number };
    persistent: any;
    agentOpts: { [key: string]: any };
    agent: Function;
    store: Store;
    middleware: MidwarePool;

    constructor(context?: Context);

    /**
     * Attaches a new entity as parent entity.
     */
    useParent(context: Context): this;

    /**
     * Returns the current context data as raw object.
     */
    raw(): any;

    /**
     * Merges current context and parent context data.
     */
    merge(): any;

    /**
     * Merge current context and parent path params.
     */
    renderParams(req: Request): any;

    /**
     * Creates another context inheriting data from the current instance.
     */
    clone(): Context;

    /**
     * Builds the current path.
     */
    buildPath();
  }

  /**
   * Store implements a simple hierarhical polymorfic data store,
   * also providing a convenient and handy interface to deal with stored data.
   */
  class Store {
    parent?: Store;
    map: any;

    constructor(store?: Store);

    /**
     * Get value looking by key in parent stores.
     */
    getParent(key: string): any;

    /**
     * Get value looking by key in current and parent stores.
     */
    get(key: string): any;

    /**
     * Set a value by key in current store.
     */
    set(key: string, value: any);

    /**
     * Set a value by key in the parent store.
     */
    setParent(key: string, value: any);

    /**
     * Attaches a new parent store.
     */
    useParent(key: string);

    /**
     * Removes a key and value in the current store.
     */
    remove(key: string);

    /**
     * Checks if the given key exists in current and parent stores.
     */
    has(key: string): any;
  }

  class Base {
    parent?: Base;
    publicClient?: any;
    plugins: any[];
    ctx: Context;

    constructor(context?: Context);

    /**
     * Attaches a parent object to the current instance.
     */
    useParent<T extends Base>(parent: T): this;

    /**
     * Extend options object.
     */
    options(opts: any): this;

    /**
     * Force to persist given options.
     * They won't be overwritten.
     */
    persistOptions(opts: any): this;

    /**
     * Attaches a middleware function to the incoming request phase.
     */
    use(middleware: Request.Middleware): this;
    useRequest(middleware: Request.Middleware): this;

    /**
     * Attaches a middleware function to the request phase, limited
     * to the current entity phase, meaning other entities
     * won't trigger this middleware.
     */
    useEntity(middleware: Request.Middleware): this;
    useEntityRequest(middleware: Request.Middleware): this;

    /**
     * Attaches a middleware function to the response phase.
     */
    useResponse(middleware: Request.Middleware): this;

    /**
     * Attaches a middleware function to the response phase, limited
     * to the current entity phase, meaning other entities
     * won't trigger this middleware.
     */
    useEntityResponse(middleware: Request.Middleware): this;

    /**
     * Attaches a simple response function listener.
     */
    handle(handler: (res: Response, req: Request) => void): this;
    response(handler: (res: Response, req: Request) => void): this;

    /**
     * Attach an observer middleware function to the before request phase.
     */
    before(middleware: Request.Middleware): this;

    /**
     * Attach an observer middleware function to the after request phase.
     */
    after(middleware: Request.Middleware): this;

    /**
     * Attach a request validator middleware function.
     */
    validator(middleware: Request.Validator): this;
    requestValidator(middleware: Request.Validator): this;

    /**
     * Attach a response validator middleware function to the request phase.
     */
    responseValidator(middleware: Request.Validator): this;

    /**
     * Attach an entity specific validator middleware
     * function to the request phase.
     */
    entityResponseValidator(middleware: Request.Validator): this;

    /**
     * Attach a request interceptor middleware function
     */
    interceptor(interceptor: Request.Interceptor): this;

    /**
     * Attach a request interceptor middleware function limited
     * to the scope of the current entity.
     */
    entityInterceptor(interceptor: Request.Interceptor): this;

    /**
     * Attach a request evaluator strategy in order to detemine
     * if the current request was failed or not.
     */
    evlauator(evaluator: Request.Evaluator): this;

    /**
     * Attach a request evaluator strategy in order to detemine
     * if the current request was failed or not limited to the
     * scope of the current entity.
     */
    entityEvlauator(evaluator: Request.Evaluator): this;

    /**
     * Test if the given request params are valid or not, executing the
     * evaluator pool. Callback will be resolved with error or boolean.
     */
    validate(callback: Request.Validator): this;

    /**
     * Attach a new observer middleware hook to a custom phase.
     */
    observe(phase: string, hook: Request.Hook): this;

    /**
     * Attach a new observer middleware hook to a custom phase
     * limited to the scope of the current entity.
     */
    observeEntity(phase: string, hook: Request.Hook): this;

    /**
     * Attach a new plugin.
     */
    plugin(plugin: Function): this;
    usePlugin(plugin: Function): this;

    /**
     * Retrieve a plugin searching by name or function reference.
     */
    getPlugin(search: string | Function): Function;

    /**
     * Bind body to a given model.
     */
    model(model: Function): this;

    /**
     * Bind a function to map/modify/transform response body.
     */
    map(mapper: Response.Mapper): this;
    bodyMap(mapper: Response.Mapper): this;

    /**
     * Set the HTTP agent adapter to be used for network dialing.
     */
    agent(agent: string | Function): this;

    /**
     * Extend the HTTP agent specific options to be used when calling the adapter.
     */
    agentOpts(opts: any): this;

    /**
     * Set the HTTP agent specific options to be used when calling the adapter.
     */
    setAgentOpts(opts: any): this;

    /**
     * Set persistent HTTP agent specific options.
     */
    persistentAgentOpts(opts: any): this;

    /**
     * Retrieve the current context store instance.
     */
    getStore(): Store;

    /**
     * Retrieve the root parent entity.
     */
    getRoot(): this;

    /**
     * Retrieve the public API engine client.
     */
    getApi(): entities.Client;

    /**
     * Retrieve the entity hierarchy based on the parent entities.
     */
    getEntityHierarchy(): string;
  }

  class Dispatcher {
    /**
     * Trigger the before phase.
     */
    before: Request.Middleware;

    /**
     * Trigger the after phase.
     */
    after: Request.Middleware;

    /**
     * Trigger the network dialing phase.
     */
    dial: Request.Middleware;

    /**
     * Performs HTTP network dialing.
     */
    doDial: Request.Middleware;

    constructor(req: Request);

    /**
     * Trigger the dispatcher process for the current request.
     */
    run(cb: Function): Request;

    /**
     * Runs a custom hook by event name.
     */
    runHook(event: string, req: Request, res: Response, next: Request.Next): void;

    /**
     * Runs a custom hook phase by name.
     */
    runPhase(phase: string, req: Request, res: Response, next: Request.Next): void;

    /**
     * Runs a custom middleware stack by name.
     */
    runStack(stack: string, phase: string, req: Request, res: Response, next: Request.Next): void;

    /**
     * Runs a middleware stack by entity name.
     */
    runEntity(entity: string, req: Request, res: Response, next: Request.Next): void;

    /**
     * Runs a context middleware stack by name.
     */
    runMiddleware(entity: string, req: Request, res: Response, next: Request.Next): void;
  }

  namespace engine {
    class Client extends Base {
      doRequest(ctx: Context, cb: Function): any;

      newRequest(entity: entities.Entity): any;

      GET(opts: any, cb: Function): any;
      POST(opts: any, cb: Function): any;
      PUT(opts: any, cb: Function): any;
      PATCH(opts: any, cb: Function): any;
      DELETE(opts: any, cb: Function): any;
      HEAD(opts: any, cb: Function): any;
      TRACE(opts: any, cb: Function): any;
      OPTIONS(opts: any, cb: Function): any;
    }
  }

  namespace entities {
    class Client extends Entity {

      set(key: string, version: string): this;

      basePath(path: string): this;

      type(contentType: string): this;
    }
    class Collection extends Entity {
      entity: 'collection';
    }
    class Resource extends Entity {
      entity: 'resource';
    }
    class Mixin extends Entity {
      entity: 'mixin';

      constructor(name: string | void, mixin: Function);
    }
    class Entity extends Request {
      name: string;
      aliases: string[];
      entities: Entity[];
      decorators: Function[];

      /**
       * Defines an entity alias by name.
       */
      alias(...aliases: string[]): this;

      /**
       * Attaches a child collection to the current entity.
       */
      collection(collection: string | Collection): Collection;

      /**
       * Attaches a child resource to the current entity.
       */
      action(resource: string | Entity): Resource;
      resource(resource: string | Entity): Resource;

      /**
       * Attaches a child mixin to the current entity.
       */
      mixin(name: string, mixin: any | Mixin): Entity;
      helper(name: string, mixin: any | Mixin): Entity;

      /**
       * Registers a new entity instance as child entity.
       */
      addEntity(entity: Entity): Entity;

      /**
       * Finds a collection type entity as child entities in the current entity.
       */
      getCollection(name: string): Collection;
      findCollection(name: string): Collection;

      /**
       * Finds a resource type entity as child entities in the current entity.
       */
      getAction(name: string): Resource;
      getResource(name: string): Resource;
      findResource(name: string): Resource;

      /**
       * Finds a mixin type entity as child entities in the current entity.
       */
      getMixin(name: string): Mixin;
      findMixin(name: string): Mixin;

      /**
       * Uses a custom constructor function for the current entity.
       */
      useConstructor(fn: Function): this;

      /**
       * Decorate current entity constructor.
       */
      decorate(decorator: Function): this;
      decorator(decorator: Function): this;

      /**
       * Attaches meta data to the current entity.
       * Designed for future use cases and documentation purposes.
       */
      meta(meta: any): this;

      /**
       * Extend entity custom prototype chain.
       * Useful for composition and behavior extensibility by API developers.
       */
      extend(prop: string | any, value: any): this;

      /**
       * Renders the current and parent entities.
       * This method is used internally.
       */
      render<T>(client?: Client): T;

      /**
       * Renders the current entity and its child entities.
       * This method is used internally.
       */
      renderEntity<T>(client?: Client): T;

      /**
       * Clone the current entity, saving its context and configuration data.
       */
      clone(): this;
    }
  }
}

declare interface theon {
  VERSION: string;

  /**
   * API to manage HTTP agents adapters.
   */
  agents: {
    /**
     * Map of agents by name and adapter function.
     */
    agents: { [name: string]: Function };
    /**
     * Retrieve the default HTTP agent adapter bases on the runtime environment.
     */
    defaults(): Function;
    /**
     * Retrieve an HTTP agent adapter by name.
     */
    get(name: string): Function;
    /**
     * Register a new HTTP agent adapter by name.
     */
    add(name: string, agent: Function): void;
    /**
     * Set an HTTP agent to be used by default. All the HTTP traffic will be handled by this agent.
     */
    set(agent: Function): void;
    remove(name: string): void;
  };

  /**
   * Creates a new client entity
   */
  client(name: string): theon.entities.Client;

  /**
   * Creates a new resource entity
   */
  resource(name: string): theon.entities.Resource;

  /**
   * Creates a new collection entity
   */
  collection(name: string): theon.entities.Collection;

  /**
   * Creates a new mixin entity
   */
  mixin(name: string): theon.entities.Mixin;
}

/**
 * Creates a new Theon API client
 */
declare function theon(url?: string): theon.entities.Client;

export = theon;
