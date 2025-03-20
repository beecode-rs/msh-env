import { logger } from '#src/util/logger';
export class NamingStrategySuffixName {
    _suffix;
    constructor(suffix) {
        this._suffix = suffix;
    }
    names(names) {
        const resultNames = [...names.map((n) => [n, this._suffix].join(''))];
        logger().debug(`Original names: [${names.join(', ')}], suffixed names : [${resultNames.join(', ')}]`);
        return resultNames;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VmZml4LW5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbmFtaW5nLXN0cmF0ZWd5L3N1ZmZpeC1uYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUV6QyxNQUFNLE9BQU8sd0JBQXdCO0lBQ2pCLE9BQU8sQ0FBUTtJQUVsQyxZQUFZLE1BQWM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDdEIsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFlO1FBQ3BCLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUVyRyxPQUFPLFdBQVcsQ0FBQTtJQUNuQixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlIE5hbWluZ1N0cmF0ZWd5IH0gZnJvbSAnI3NyYy9uYW1pbmctc3RyYXRlZ3knXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcjc3JjL3V0aWwvbG9nZ2VyJ1xuXG5leHBvcnQgY2xhc3MgTmFtaW5nU3RyYXRlZ3lTdWZmaXhOYW1lIGltcGxlbWVudHMgTmFtaW5nU3RyYXRlZ3kge1xuXHRwcm90ZWN0ZWQgcmVhZG9ubHkgX3N1ZmZpeDogc3RyaW5nXG5cblx0Y29uc3RydWN0b3Ioc3VmZml4OiBzdHJpbmcpIHtcblx0XHR0aGlzLl9zdWZmaXggPSBzdWZmaXhcblx0fVxuXG5cdG5hbWVzKG5hbWVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcblx0XHRjb25zdCByZXN1bHROYW1lcyA9IFsuLi5uYW1lcy5tYXAoKG4pID0+IFtuLCB0aGlzLl9zdWZmaXhdLmpvaW4oJycpKV1cblx0XHRsb2dnZXIoKS5kZWJ1ZyhgT3JpZ2luYWwgbmFtZXM6IFske25hbWVzLmpvaW4oJywgJyl9XSwgc3VmZml4ZWQgbmFtZXMgOiBbJHtyZXN1bHROYW1lcy5qb2luKCcsICcpfV1gKVxuXG5cdFx0cmV0dXJuIHJlc3VsdE5hbWVzXG5cdH1cbn1cbiJdfQ==