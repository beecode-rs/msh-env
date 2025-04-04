import minimist from 'minimist';
import buildOptions from 'minimist-options';
export class LocationStrategyCliArgsMinimist {
    _miniOpts;
    _args;
    constructor(params) {
        const { options = {}, args = process.argv.slice(2) } = params ?? {};
        // @ts-ignore issue with loading minimist-options as es module
        this._miniOpts = buildOptions(options);
        this._args = minimist(args, this._miniOpts);
    }
    valueByName(name) {
        const value = this._args[name];
        if (value === undefined) {
            return value;
        }
        return value.toString();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLWFyZ3MtbWluaW1pc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9jYXRpb24tc3RyYXRlZ3kvY2xpLWFyZ3MtbWluaW1pc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFBO0FBQy9CLE9BQU8sWUFBOEIsTUFBTSxrQkFBa0IsQ0FBQTtBQUk3RCxNQUFNLE9BQU8sK0JBQStCO0lBQ3hCLFNBQVMsQ0FBZTtJQUN4QixLQUFLLENBQUc7SUFFM0IsWUFBWSxNQUErQztRQUMxRCxNQUFNLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLElBQUksRUFBRSxDQUFBO1FBQ25FLDhEQUE4RDtRQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBWTtRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3pCLE9BQU8sS0FBSyxDQUFBO1FBQ2IsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ3hCLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtaW5pbWlzdCBmcm9tICdtaW5pbWlzdCdcbmltcG9ydCBidWlsZE9wdGlvbnMsIHsgdHlwZSBPcHRpb25zIH0gZnJvbSAnbWluaW1pc3Qtb3B0aW9ucydcblxuaW1wb3J0IHsgdHlwZSBMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9sb2NhdGlvbi1zdHJhdGVneSdcblxuZXhwb3J0IGNsYXNzIExvY2F0aW9uU3RyYXRlZ3lDbGlBcmdzTWluaW1pc3Q8VCBleHRlbmRzIG1pbmltaXN0LlBhcnNlZEFyZ3M+IGltcGxlbWVudHMgTG9jYXRpb25TdHJhdGVneSB7XG5cdHByb3RlY3RlZCByZWFkb25seSBfbWluaU9wdHM6IG1pbmltaXN0Lk9wdHNcblx0cHJvdGVjdGVkIHJlYWRvbmx5IF9hcmdzOiBUXG5cblx0Y29uc3RydWN0b3IocGFyYW1zPzogeyBvcHRpb25zPzogT3B0aW9uczsgYXJncz86IHN0cmluZ1tdIH0pIHtcblx0XHRjb25zdCB7IG9wdGlvbnMgPSB7fSwgYXJncyA9IHByb2Nlc3MuYXJndi5zbGljZSgyKSB9ID0gcGFyYW1zID8/IHt9XG5cdFx0Ly8gQHRzLWlnbm9yZSBpc3N1ZSB3aXRoIGxvYWRpbmcgbWluaW1pc3Qtb3B0aW9ucyBhcyBlcyBtb2R1bGVcblx0XHR0aGlzLl9taW5pT3B0cyA9IGJ1aWxkT3B0aW9ucyhvcHRpb25zKVxuXHRcdHRoaXMuX2FyZ3MgPSBtaW5pbWlzdDxUPihhcmdzLCB0aGlzLl9taW5pT3B0cylcblx0fVxuXG5cdHZhbHVlQnlOYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLl9hcmdzW25hbWVdXG5cdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZS50b1N0cmluZygpXG5cdH1cbn1cbiJdfQ==