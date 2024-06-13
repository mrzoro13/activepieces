import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { platformMustHaveFeatureEnabled } from '../authentication/ee-authorization'
import { issuesController } from './issues-controller'
import { entitiesMustBeOwnedByCurrentProject } from '../../authentication/authorization'

export const issuesModule: FastifyPluginAsyncTypebox = async (app) => {
    app.addHook('preSerialization', entitiesMustBeOwnedByCurrentProject)
    app.addHook('preHandler', platformMustHaveFeatureEnabled((platform) => platform.flowIssuesEnabled))
    await app.register(issuesController, { prefix: '/v1/issues' })
}
