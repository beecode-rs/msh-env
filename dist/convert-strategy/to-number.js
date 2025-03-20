export class ConvertStrategyToNumber {
    convert(str) {
        if (str === undefined) {
            return undefined;
        }
        if (str.trim() === '') {
            return undefined;
        }
        const convertedValue = Number(str);
        if (isNaN(convertedValue)) {
            throw new Error(`"${str}" is not a number`);
        }
        return convertedValue;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tbnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnZlcnQtc3RyYXRlZ3kvdG8tbnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sT0FBTyx1QkFBdUI7SUFDbkMsT0FBTyxDQUFDLEdBQVk7UUFDbkIsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdkIsT0FBTyxTQUFTLENBQUE7UUFDakIsQ0FBQztRQUNELElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sU0FBUyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEMsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxDQUFBO1FBQzVDLENBQUM7UUFFRCxPQUFPLGNBQWMsQ0FBQTtJQUN0QixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlIENvbnZlcnRTdHJhdGVneSB9IGZyb20gJyNzcmMvY29udmVydC1zdHJhdGVneSdcblxuZXhwb3J0IGNsYXNzIENvbnZlcnRTdHJhdGVneVRvTnVtYmVyIGltcGxlbWVudHMgQ29udmVydFN0cmF0ZWd5PG51bWJlcj4ge1xuXHRjb252ZXJ0KHN0cj86IHN0cmluZyk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHN0ciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0fVxuXHRcdGlmIChzdHIudHJpbSgpID09PSAnJykge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxuXHRcdH1cblx0XHRjb25zdCBjb252ZXJ0ZWRWYWx1ZSA9IE51bWJlcihzdHIpXG5cdFx0aWYgKGlzTmFOKGNvbnZlcnRlZFZhbHVlKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBcIiR7c3RyfVwiIGlzIG5vdCBhIG51bWJlcmApXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbnZlcnRlZFZhbHVlXG5cdH1cbn1cbiJdfQ==