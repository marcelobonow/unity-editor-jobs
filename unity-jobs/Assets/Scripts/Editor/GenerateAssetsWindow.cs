using UnityEngine;
using UnityEditor;

public class GenerateAssetsWindow : EditorWindow
{
    [MenuItem("Window/GenerateAssetBundle")]
    public static void ShowWindow()
    {
        GetWindow<GenerateAssetsWindow>("Generate Asset Bundle");
    }

    private void OnGUI()
    {
        if (GUILayout.Button("Generate Prefab"))
        {
            GeneratePrefab();
        }
        if (GUILayout.Button("Centralize"))
        {
            Centralize();
        }
    }

    private void GeneratePrefab()
    {
        GenerateAssetBundle.CreatePrefab();
    }
    private void Centralize()
    {
        GenerateAssetBundle.Centralize();
    }
}