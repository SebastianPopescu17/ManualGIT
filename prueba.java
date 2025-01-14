package inicio;
import java.util.Scanner;
public class prueba {
    private static Scanner input = new Scanner(System.in);
    public static void main(String[] args) {
        int num = 0, cont_pos = 0, cont_neg = 0, suma_pos = 0, suma_neg = 0;
        float media_pos = 0, media_neg = 0;
        int max_num = Integer.MIN_VALUE, min_num = Integer.MAX_VALUE;  // Inicializamos max y min

        System.out.println("Ingrese un número entero (0 para terminar):");
        num = input.nextInt();

        while (num != 0) {
            if (num > 0) {
                cont_pos++;
                suma_pos += num;
            } else {
                cont_neg++;
                suma_neg += num;
            }
            // Actualizamos el máximo y el mínimo
            if (num > max_num) {
                max_num = num;
            }
            if (num < min_num) {
                min_num = num;
            }
            System.out.println("Ingrese un número entero (0 para terminar):");
            num = input.nextInt();
        }
        if (cont_pos != 0) {
            media_pos = (float) suma_pos / cont_pos;
            System.out.println("Media de los positivos: " + media_pos);
        } else {
            System.out.println("No se ingresaron números positivos.");
        }
        if (cont_neg != 0) {
            media_neg = (float) suma_neg / cont_neg;
            System.out.println("Media de los negativos: " + media_neg);
        } else {
            System.out.println("No se ingresaron números negativos.");
        }
        if (cont_pos == 0 && cont_neg == 0) {
            System.out.println("No se ingresaron números diferentes de 0.");
        }
        // Mostrar el número máximo y mínimo
        if (cont_pos + cont_neg > 0) {  
            System.out.println("El número máximo ingresado es: " + max_num);
            System.out.println("El número mínimo ingresado es: " + min_num);
        }
    }
}
