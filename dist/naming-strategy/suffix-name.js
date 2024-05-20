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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VmZml4LW5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbmFtaW5nLXN0cmF0ZWd5L3N1ZmZpeC1uYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUV6QyxNQUFNLE9BQU8sd0JBQXdCO0lBQ2pCLE9BQU8sQ0FBUTtJQUVsQyxZQUFZLE1BQWM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDdEIsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFlO1FBQ3BCLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUVyRyxPQUFPLFdBQVcsQ0FBQTtJQUNuQixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYW1pbmdTdHJhdGVneSB9IGZyb20gJyNzcmMvbmFtaW5nLXN0cmF0ZWd5J1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnI3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIE5hbWluZ1N0cmF0ZWd5U3VmZml4TmFtZSBpbXBsZW1lbnRzIE5hbWluZ1N0cmF0ZWd5IHtcblx0cHJvdGVjdGVkIHJlYWRvbmx5IF9zdWZmaXg6IHN0cmluZ1xuXG5cdGNvbnN0cnVjdG9yKHN1ZmZpeDogc3RyaW5nKSB7XG5cdFx0dGhpcy5fc3VmZml4ID0gc3VmZml4XG5cdH1cblxuXHRuYW1lcyhuYW1lczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG5cdFx0Y29uc3QgcmVzdWx0TmFtZXMgPSBbLi4ubmFtZXMubWFwKChuKSA9PiBbbiwgdGhpcy5fc3VmZml4XS5qb2luKCcnKSldXG5cdFx0bG9nZ2VyKCkuZGVidWcoYE9yaWdpbmFsIG5hbWVzOiBbJHtuYW1lcy5qb2luKCcsICcpfV0sIHN1ZmZpeGVkIG5hbWVzIDogWyR7cmVzdWx0TmFtZXMuam9pbignLCAnKX1dYClcblxuXHRcdHJldHVybiByZXN1bHROYW1lc1xuXHR9XG59XG4iXX0=