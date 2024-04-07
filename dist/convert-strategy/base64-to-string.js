import { Base64 } from 'js-base64';
export class ConvertStrategyBase64ToString {
    convert(str) {
        if (str === undefined) {
            return undefined;
        }
        if (str.trim() === '') {
            return undefined;
        }
        try {
            if (!Base64.isValid(str)) {
                throw new Error('Invalid character: the string to be decoded is not correctly encoded.');
            }
            const decodedString = Base64.decode(str);
            if (decodedString.trim() === '') {
                return undefined;
            }
            return decodedString;
        }
        catch (err) {
            throw new Error(`"${str}" is not a base64. Error: ${err.message}`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LXRvLXN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0LXN0cmF0ZWd5L2Jhc2U2NC10by1zdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUlsQyxNQUFNLE9BQU8sNkJBQTZCO0lBQ3pDLE9BQU8sQ0FBQyxHQUFZO1FBQ25CLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sU0FBUyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN2QixPQUFPLFNBQVMsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsSUFBSSxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFBO1lBQ3pGLENBQUM7WUFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3hDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUNqQyxPQUFPLFNBQVMsQ0FBQTtZQUNqQixDQUFDO1lBRUQsT0FBTyxhQUFhLENBQUE7UUFDckIsQ0FBQztRQUFDLE9BQU8sR0FBUSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsNkJBQTZCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQ25FLENBQUM7SUFDRixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlNjQgfSBmcm9tICdqcy1iYXNlNjQnXG5cbmltcG9ydCB7IENvbnZlcnRTdHJhdGVneSB9IGZyb20gJyNzcmMvY29udmVydC1zdHJhdGVneSdcblxuZXhwb3J0IGNsYXNzIENvbnZlcnRTdHJhdGVneUJhc2U2NFRvU3RyaW5nIGltcGxlbWVudHMgQ29udmVydFN0cmF0ZWd5PHN0cmluZz4ge1xuXHRjb252ZXJ0KHN0cj86IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHN0ciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0fVxuXHRcdGlmIChzdHIudHJpbSgpID09PSAnJykge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0aWYgKCFCYXNlNjQuaXNWYWxpZChzdHIpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJylcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZGVjb2RlZFN0cmluZyA9IEJhc2U2NC5kZWNvZGUoc3RyKVxuXHRcdFx0aWYgKGRlY29kZWRTdHJpbmcudHJpbSgpID09PSAnJykge1xuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkZWNvZGVkU3RyaW5nXG5cdFx0fSBjYXRjaCAoZXJyOiBhbnkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgXCIke3N0cn1cIiBpcyBub3QgYSBiYXNlNjQuIEVycm9yOiAke2Vyci5tZXNzYWdlfWApXG5cdFx0fVxuXHR9XG59XG4iXX0=